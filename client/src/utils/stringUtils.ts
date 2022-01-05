export const wordToProperCase = (word: string): string =>
  word.length > 1
    ? `${word[0].toUpperCase()}${word.substring(1)}`
    : word.toUpperCase();

export const snakeToProperCase = (snakeCase: string): string => {
  const words = snakeCase.toLowerCase().split("_");
  return words.map((word) => wordToProperCase(word)).join(" ");
};
