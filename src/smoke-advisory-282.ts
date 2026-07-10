// Sprint-282 Prod-Smoke (Advisory-Fall) — wird nach dem Lauf entfernt.
// Nur Konventions-/Stil-Verstöße: Magic Numbers, dupliziertes Blockpaar, toter Export.

export function berechneRabattStufeEins(betrag: number): number {
  if (betrag > 250) {
    return betrag * 0.93;
  }
  if (betrag > 120) {
    return betrag * 0.97;
  }
  return betrag;
}

export function berechneRabattStufeZwei(betrag: number): number {
  if (betrag > 250) {
    return betrag * 0.93;
  }
  if (betrag > 120) {
    return betrag * 0.97;
  }
  return betrag;
}

export const UNUSED_SMOKE_EXPORT = 42;
