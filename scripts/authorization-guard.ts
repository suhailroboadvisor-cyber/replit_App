import { Node, Project, SyntaxKind, type SourceFile, type Statement } from "ts-morph";
import path from "node:path";
const allowed = new Map([
  ["requireRole","src/lib/auth/guards.ts"],["requireUser","src/lib/auth/guards.ts"],
  ["withAdminAction","src/lib/auth/actions.ts"],["withUserAction","src/lib/auth/actions.ts"],
]);
function firstStatement(statement: Statement | undefined): Statement | undefined {
  if(statement && Node.isTryStatement(statement)) return statement.getTryBlock().getStatements()[0];
  return statement;
}
function guarded(statement: Statement | undefined, source: SourceFile) {
  if(statement && Node.isTryStatement(statement)) {
    const caught=statement.getCatchClause()?.getBlock();
    if(caught) {
      const statements=caught.getStatements();
      const terminal=statements.at(-1);
      if(!terminal || (!Node.isThrowStatement(terminal) && !Node.isReturnStatement(terminal))) return false;
      // The failure branch may only return the canonical typed error response,
      // throw, or a literal fixture value. No internal reads hidden in catch.
      const calls=caught.getDescendantsOfKind(SyntaxKind.CallExpression);
      for(const failedCall of calls) {
        const callee=failedCall.getExpression().getText();
        const errorModule=callee==="httpError"?"src/lib/auth/http.ts":callee==="actionError"?"src/lib/auth/errors.ts":null;
        const imported=source.getImportDeclarations().find(i=>i.getNamedImports().some(n=>n.getName()===callee&&!n.getAliasNode()));
        if(!errorModule || !imported) return false;
        const spec=imported.getModuleSpecifierValue();
        const resolved=spec.startsWith("@/")?path.resolve("src",spec.slice(2)):path.resolve(path.dirname(source.getFilePath()),spec);
        if(resolved.replace(/\.ts$/,"")!==path.resolve(errorModule).replace(/\.ts$/,"")) return false;
      }
    }
    const finallyBlock=statement.getFinallyBlock();
    if(finallyBlock?.getStatements().length) return false;
  }
  statement=firstStatement(statement);
  let expression;
  if(statement && Node.isVariableStatement(statement)) {
    const declarations=statement.getDeclarations();
    if(declarations.length!==1) return false;
    expression=declarations[0].getInitializer();
  } else if(statement && Node.isExpressionStatement(statement)) expression=statement.getExpression();
  else if(statement && Node.isReturnStatement(statement)) expression=statement.getExpression();
  if(!expression || !Node.isAwaitExpression(expression)) return false;
  const call=expression.getExpression();
  if(!Node.isCallExpression(call) || !Node.isIdentifier(call.getExpression())) return false;
  const identifier=call.getExpression().getText();
  // Only direct canonical imports count. Local aliases, wrappers, namespace calls and reexports fail closed.
  const binding=source.getImportDeclarations().flatMap(i=>i.getNamedImports().map(n=>({i,n}))).find(({n})=>n.getName()===identifier && !n.getAliasNode());
  if(!binding) return false;
  // Callback bodies run after authorization inside canonical action wrappers.
  // All other arguments are evaluated first and must not do hidden work.
  for(const argument of call.getArguments()) {
    if(Node.isArrowFunction(argument)||Node.isFunctionExpression(argument)) continue;
    if(Node.isCallExpression(argument)||Node.isNewExpression(argument)||Node.isAwaitExpression(argument) ||
       argument.getDescendants().some(node=>Node.isCallExpression(node)||Node.isNewExpression(node)||Node.isAwaitExpression(node))) return false;
  }
  const symbol=call.getExpression().getSymbol();
  if(!symbol?.getDeclarations().some(declaration=>declaration===binding.n)) return false;
  if(binding.n.isTypeOnly() || binding.i.getImportClause()?.isTypeOnly()) return false;
  const target=allowed.get(identifier);
  if(!target) return false;
  const spec=binding.i.getModuleSpecifierValue();
  const resolved=spec.startsWith("@/")?path.resolve("src",spec.slice(2)):path.resolve(path.dirname(source.getFilePath()),spec);
  return resolved.replace(/\.(ts|tsx)$/,"") === path.resolve(target).replace(/\.ts$/,"");
}
export function authorizationViolations(source: SourceFile): string[] {
  if(source.getExportDeclarations().length) return ["re-exported handler/action cannot be authorized locally"];
  const errors:string[]=[];
  for(const [name,nodes] of source.getExportedDeclarations()) {
    if(["dynamic","revalidate","runtime","maxDuration","preferredRegion"].includes(name) && nodes.every(node=>Node.isVariableDeclaration(node) && node.getInitializer() && !Node.isArrowFunction(node.getInitializer()!) && !Node.isFunctionExpression(node.getInitializer()!))) continue;
    for(const node of nodes) {
      if(!Node.isFunctionDeclaration(node) || !node.isAsync()) {errors.push(`${name}: aliases and non-async exports are forbidden`);continue;}
      const body=node.getBody();
      if(!body || !Node.isBlock(body) || !guarded(body.getStatements()[0],source)) errors.push(`${name}: authorization must be first awaited operation`);
    }
  }
  return errors;
}
export function scanAuthorization() {
  const project=new Project({skipAddingFilesFromTsConfig:true});
  project.addSourceFilesAtPaths(["src/**/*.ts","src/**/*.tsx"]);
  const errors:string[]=[];
  for(const source of project.getSourceFiles()) {
    const relative=path.relative(process.cwd(),source.getFilePath()).replaceAll("\\","/");
    const isAction=source.getStatements().some(statement=>{
      if(!Node.isExpressionStatement(statement)) return false;
      const expression=statement.getExpression();
      return Node.isStringLiteral(expression) && expression.getLiteralValue()==="use server";
    });
    const isApi=/^src\/app\/api\/.*\/route\.ts$/.test(relative);
    if(!isAction && !isApi) continue;
    if(relative==="src/app/api/health/route.ts" || relative.startsWith("src/app/api/internal/") || relative.startsWith("src/app/api/hooks/")) continue;
    errors.push(...authorizationViolations(source).map(e=>`${relative}: ${e}`));
  }
  return errors;
}
