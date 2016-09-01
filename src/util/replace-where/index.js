export default function replaceWhere(arr, predicateFn, transformFn) {
  return arr.map((v, i, a) => predicateFn(v, i, a) ? transformFn(v, i, a) : v);
}
