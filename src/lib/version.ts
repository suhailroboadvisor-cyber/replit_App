export function getAppVersion(
  packageVersion: string,
  gitSha = process.env.GIT_SHA ?? process.env.GITHUB_SHA,
): string {
  return gitSha ? `${packageVersion}+${gitSha.slice(0, 7)}` : packageVersion;
}
