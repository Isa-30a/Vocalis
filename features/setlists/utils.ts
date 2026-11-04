export function formatTotalMinutes(seconds: number): string {
  if (seconds <= 0) {
    return "Sin duración";
  }

  return `${Math.round(seconds / 60)} min`;
}
