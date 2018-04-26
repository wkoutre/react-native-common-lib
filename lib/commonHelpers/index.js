import { Colors } from "../../../../src/assets/";

export const capitalizeFirstLetter = word =>
  word[0].toUpperCase() + word.slice(1);

export const getColorFromString = color => {
  const colorToReturn = Colors[color];

  if (colorToReturn) {
    return colorToReturn;
  }

  throw new Error(
    `No color in your Colors obj named: ${color}. Please see the README for how to setup Colors.`
  );
};

export const getDisabledColorFromString = color => {
  const disabledColorToReturn =
    Colors[`disabled${capitalizeFirstLetter(color)}`];

  if (disabledColorToReturn) {
    return Colors[`disabled${capitalizeFirstLetter(color)}`];
  }

  console.warn(
    `No color found in Colors for disabled${capitalizeFirstLetter(
      color
    )}. Returning for ${color} instead. `
  );

  return getColorFromString(color);
};

export * from "./defaultRefs";
