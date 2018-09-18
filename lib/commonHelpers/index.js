import { memoize } from "underscore";
import { ExampleColors } from "../../example";
import {
  CreateTextStyles,
  DefaultTextStyles,
  WIDTH,
  HEIGHT,
} from "../commonAssets";

let GlobalColors = ExampleColors;
let GlobalTextStyles = {};

class CommonAssets {
  constructor(config = {}) {
    const { Colors, TextStyles, textStylesConfig } = config;

    this.Colors = Colors || ExampleColors;
    this.TextStyles =
      TextStyles || textStylesConfig
        ? new CreateTextStyles(textStylesConfig).allTextStyles
        : DefaultTextStyles.allTextStyles;

    GlobalColors = {
      ...this.Colors,
    };

    GlobalTextStyles = {
      ...this.TextStyles,
    };
  }

  get colors() {
    return this.Colors;
  }

  get textStyles() {
    return this.TextStyles;
  }

  capitalizeFirstLetter = word => word[0].toUpperCase() + word.slice(1);

  getColorFromString = color => {
    const colorToReturn = this.Colors[color];

    if (colorToReturn) {
      return colorToReturn;
    }

    console.warn(`No color in your Colors obj named: ${color}. Please see the README for how to setup Colors.

      Returning the color.`);

    return color;
  };

  getDisabledColorFromString = color => {
    const disabledColorToReturn = this.Colors[
      `disabled${this.capitalizeFirstLetter(color)}`
    ];

    if (disabledColorToReturn) {
      return this.Colors[`disabled${this.capitalizeFirstLetter(color)}`];
    }

    console.warn(
      `No color found in Colors for disabled${this.capitalizeFirstLetter(
        color,
      )}. Returning for ${color} instead. `,
    );

    return this.getColorFromString(color);
  };
}

export const getGlobalColors = () => GlobalColors;
export const getGlobalTextStyles = () => GlobalTextStyles;
export const capitalizeFirstLetter = word =>
  word[0].toUpperCase() + word.slice(1);

export const getColorFromString = memoize(color => {
  const colorToReturn = getGlobalColors()[color];

  if (colorToReturn) {
    return colorToReturn;
  }

  console.warn(`No color in your Colors obj named: ${color}. Please see the README for how to setup Colors.

      Returning the color: ${color}`);

  return color;
});

export const getDisabledColorFromString = memoize(color => {
  const disabledColorToReturn = getGlobalColors()[
    `disabled${capitalizeFirstLetter(color)}`
  ];

  if (disabledColorToReturn) {
    return getGlobalColors()[`disabled${capitalizeFirstLetter(color)}`];
  }

  console.warn(
    `No color found in Colors for disabled${capitalizeFirstLetter(
      color,
    )}. Returning for ${color} instead. `,
  );

  return getColorFromString(color);
});

export const nToPercent = (n, widthOrHeight) => {
  const percent = n / 100;

  if (widthOrHeight === "width") {
    return percent * WIDTH;
  }

  return percent * HEIGHT;
};

// to set GlobalColors and GlobalTextStyles
const DefaultCommonAssets = new CommonAssets();

export const getImageSource = memoize(image => {
  if (typeof image === "number") {
    return image;
  }

  if (typeof image === "string") {
    return { uri: image };
  }

  throw new Error("Image is neither local or a uri.");
});

export * from "./defaultRefs";
export * from "./styleHelpers";
export { CommonAssets, DefaultCommonAssets };
