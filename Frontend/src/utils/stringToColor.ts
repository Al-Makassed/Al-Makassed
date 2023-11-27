/**
 * @param source string to be hashed
 *
 * @returns number represents the corresponding hash code of the string
 */
const hashCode = (source: string): number => {
  let hash = 0;
  for (let i = 0; i < source.length; i += 1) {
    const char = source.charCodeAt(i);
    hash = char + ((hash << 5) - hash);
  }
  return hash;
};

/**
 * @param source string to be converted to color
 * @param options array of color options to choose from
 *
 * @returns one of the options based on the hash code of the string
 */
const stringToColor = <T>(source: string, options: T[]): T => {
  const hash = hashCode(source);
  const index = Math.abs(hash) % options.length;
  return options[index];
};

export default stringToColor;
