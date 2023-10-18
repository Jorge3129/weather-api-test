export const pick = <T, K extends keyof T>(item: T, keys: K[]): Pick<T, K> => {
  return keys.reduce(
    (acc, key) => {
      acc[key] = item[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
};
