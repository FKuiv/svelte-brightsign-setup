export default function getEnumItemCount(enumObj: object): number {
  return Object.keys(enumObj).filter((key) => isNaN(Number(key))).length;
}
