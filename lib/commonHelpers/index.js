import { Colors } from "@commonAssets";

export const capitalizeFirstLetter = word =>
  word[0].toUpperCase() + word.slice(1);

export const getColorFromString = color => Colors[color];

export const getDisabledColorFromString = color =>
  Colors[`disabled${capitalizeFirstLetter(color)}`];

export * from "./defaultRefs";
