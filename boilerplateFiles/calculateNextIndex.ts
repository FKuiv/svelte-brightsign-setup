export function calculateNextIndex(
  direction: string,
  currentIndex: number,
  maxIndex: number
): number {
  let newIndex = Number(currentIndex);
  if (direction === "next") {
    newIndex = newIndex === maxIndex ? 1 : newIndex + 1;
  } else {
    newIndex = newIndex === 1 ? maxIndex : newIndex - 1;
  }

  return newIndex;
}
