import { ExampleColors } from "../../example";
import {
  CreateTextStyles,
  DefaultTextStyles,
  WIDTH,
  HEIGHT
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
      ...this.Colors
    };

    GlobalTextStyles = {
      ...this.TextStyles
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

    throw new Error(
      `No color in your Colors obj named: ${color}. Please see the README for how to setup Colors.`
    );
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
        color
      )}. Returning for ${color} instead. `
    );

    return this.getColorFromString(color);
  };
}

export const capitalizeFirstLetter = word =>
  word[0].toUpperCase() + word.slice(1);

export const getColorFromString = color => {
  const colorToReturn = GlobalColors[color];

  if (colorToReturn) {
    return colorToReturn;
  }

  throw new Error(
    `No color in your Colors obj named: ${color}. Please see the README for how to setup Colors.`
  );
};

export const getDisabledColorFromString = color => {
  const disabledColorToReturn =
    GlobalColors[`disabled${capitalizeFirstLetter(color)}`];

  if (disabledColorToReturn) {
    return GlobalColors[`disabled${capitalizeFirstLetter(color)}`];
  }

  console.warn(
    `No color found in Colors for disabled${capitalizeFirstLetter(
      color
    )}. Returning for ${color} instead. `
  );

  return getColorFromString(color);
};

export const nToPercent = (n, widthOrHeight) => {
  const percent = n / 100;

  if (widthOrHeight === "width") {
    return percent * WIDTH;
  }

  return percent * HEIGHT;
};

// to set GlobalColors and GlobalTextStyles
const DefaultCommonAssets = new CommonAssets();

export const getGlobalColors = () => GlobalColors;
export const getGlobalTextStyles = () => GlobalTextStyles;

export * from "./defaultRefs";
export { CommonAssets, DefaultCommonAssets };
