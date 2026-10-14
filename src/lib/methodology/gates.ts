export const workflow = ["draft","source_verified","rules_normalized","tests_passed","universe_tested","human_reviewed","approved"] as const;
export function nextStage(status:string) {
  const index=workflow.indexOf(status as typeof workflow[number]);
  return index<0?null:workflow[index+1]??null;
}
export class GovernanceError extends Error {}
export function requireGate(condition:unknown,message:string):asserts condition {
  if(!condition) throw new GovernanceError(message);
}
