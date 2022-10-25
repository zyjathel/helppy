// code from web
export function shuffle<T extends any>(array: T[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array as T[];
}
export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function calculateWinningStates(n: number) {
  const winningByRows = Array.from(Array(n).keys()).map((i) => Array.from(Array(n).keys()).map((j) => j + n * i)
  );
  const winningByColumns = Array.from(Array(n).keys()).map((i) => Array.from(Array(n).keys()).map((j) => j * n + i)
  );
  const diagonal = Array.from(Array(n).keys()).map((i) => i * (n + 1));
  return [...winningByRows, ...winningByColumns, diagonal];
}
