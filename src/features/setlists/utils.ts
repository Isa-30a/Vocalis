export function formatTotalMinutes(seconds: number): string {
  return `${Math.round(seconds / 60)} min`;
}
