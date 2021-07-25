import utils from "..";

export function divide<T>(arr: T[] | undefined, by: number) {
  if (!arr) {
    return [];
  }
  const length = arr.length;
  const arr_ = arr.slice();

  const numberOfIter = Math.ceil(length / by);
  const container: T[][] = [];

  utils.range(numberOfIter)
    .forEach(_ => {
      const splicedElements = arr_.splice(0, by);
      container.push(splicedElements);
    })

  return container;
}