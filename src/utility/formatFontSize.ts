/**
 * function to convert font size from rem to px
 *
 * @param {string} value - font size value in rem
 * @returns {number}
 */
export function remToPx(value: string): number {
  return Math.round(parseFloat(value) * 16);
}

/**
 * function to convert font size from px to rem
 *
 * @param {number} value - font size value in px
 * @returns {string}
 */
export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}
