class CommonAssets {
  constructor({ Colors, TextStyles }) {
    this.Colors = Colors;
    this.TextStyles = TextStyles;
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

// export const capitalizeFirstLetter = word =>
//   word[0].toUpperCase() + word.slice(1);

// export const getColorFromString = color => {
//   const colorToReturn = Colors[color];

//   if (colorToReturn) {
//     return colorToReturn;
//   }

//   throw new Error(
//     `No color in your Colors obj named: ${color}. Please see the README for how to setup Colors.`
//   );
// };

// export const getDisabledColorFromString = color => {
//   const disabledColorToReturn =
//     Colors[`disabled${capitalizeFirstLetter(color)}`];

//   if (disabledColorToReturn) {
//     return Colors[`disabled${capitalizeFirstLetter(color)}`];
//   }

//   console.warn(
//     `No color found in Colors for disabled${capitalizeFirstLetter(
//       color
//     )}. Returning for ${color} instead. `
//   );

//   return getColorFromString(color);
// };

export * from "./defaultRefs";
export { CommonAssets };
