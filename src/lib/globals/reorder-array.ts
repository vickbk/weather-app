export default function reorderArray<T>(arr: T[], from: number) {
  const newArr = [...arr];
  const item = newArr.splice(from);
  newArr.unshift(...item);
  return newArr;
}
