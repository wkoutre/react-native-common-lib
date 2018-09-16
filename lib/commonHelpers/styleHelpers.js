import { StyleSheet } from "react-native";
import { memoize } from "underscore";
import {
  getColorFromString,
  nToPercent,
  getDisabledColorFromString,
  getGlobalTextStyles,
  defaultRefs,
} from "./";

// const EXCLUDED_TYPES = {
//   object: true,
//   function: true,
// };

// const getHashFromProps = textProps =>
//   Object.keys(textProps).reduce((a, b) => {
//     if (!EXCLUDED_TYPES[typeof textProps[b]]) {
//       return a.concat(textProps[b]);
//     }

//     return a;
//   }, "");

const getHashFromProps = textProps =>
  Object.keys(textProps).reduce((a, b) => a.concat(`-${textProps[b]}`), "");

const getFontWeight = memoize(
  (fontWeight, bold) => {
    if (bold) {
      return "bold";
    }

    if (fontWeight) {
      return fontWeight;
    }

    return "normal";
  },
  (fontWeight, bold) => `${fontWeight}-${bold}`,
);

const getTextColor = memoize(
  (color, disabled) =>
    disabled ? getDisabledColorFromString(color) : getColorFromString(color),
  (color, disabled) => `${color}-${disabled}`,
);

const getMargin = memoize(
  (mAllpx, mAll, mSidepx, mSide, hOrW) =>
    mAllpx || mSidepx || nToPercent(mSide, hOrW) || nToPercent(mAll, hOrW),
  (mAllpx, mAll, mSidepx, mSide, hOrW) =>
    `${mAllpx}-${mAll}-${mSidepx}-${mSide}-${hOrW}`,
);

const getTextDecorationLine = memoize(
  underline => (underline ? "underline" : "none"),
);

const getTextStyle = memoize(
  (size, hOrP) => getGlobalTextStyles()[`${hOrP}${size}`],
  (size, hOrP) => `${hOrP}-${size}`,
);

const getLetterSpacing = memoize(
  letterSpacing => (letterSpacing ? { letterSpacing } : defaultRefs.emptyObj),
);

const getLineHeight = memoize(
  lineHeight => (lineHeight ? { lineHeight } : defaultRefs.emptyObj),
);

const getBackgroundColor = memoize(
  backgroundColor =>
    backgroundColor
      ? { backgroundColor: getColorFromString(backgroundColor) }
      : defaultRefs.emptyObj,
);

export const getButtonStyleFromProps = memoize(
  ({
    alignSelf,
    disabled,
    backgroundColor,
    mAll,
    mAllpx,
    mT,
    mTpx,
    mR,
    mRpx,
    mB,
    mBpx,
    mL,
    mLpx,
    padAll,
    padY,
    padX,
    borderWidth,
    color,
    borderColor,
  }) => {
    return StyleSheet.create({
      button: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf,
        backgroundColor: getTextColor(backgroundColor, disabled),
        marginTop: getMargin(mAllpx, mAll, mTpx, mT, "height"),
        marginRight: getMargin(mAllpx, mAll, mRpx, mR, "height"),
        marginBottom: getMargin(mAllpx, mAll, mBpx, mB, "height"),
        marginLeft: getMargin(mAllpx, mAll, mLpx, mL, "height"),
        paddingTop: padAll || padY,
        paddingBottom: padAll || padY,
        paddingRight: padAll || padX,
        paddingLeft: padAll || padX,
        borderWidth,
        borderColor: getColorFromString(borderColor || color),
      },
    });
  },
  getHashFromProps,
);

export const getTouchableTextStyleFromProps = memoize(
  ({
    color,
    disabled,
    fontWeight,
    fontFamily: fontFamilyProp,
    mT,
    mB,
    mL,
    mR,
    mAll,
    mBpx,
    mTpx,
    mLpx,
    mRpx,
    mAllpx,
    header,
    size,
    bold,
  }) => {
    const textStyleFromSize = header
      ? getGlobalTextStyles()[`h${size}`]
      : getGlobalTextStyles()[`p${size}`];
    const fontFamily = fontFamilyProp || textStyleFromSize.fontFamily;

    return StyleSheet.create({
      text: {
        ...textStyleFromSize,
        color: getTextColor(color, disabled),
        lineHeight: null,
        fontWeight: (fontWeight, bold),
        marginTop: getMargin(mAllpx, mAll, mTpx, mT, "height"),
        marginRight: getMargin(mAllpx, mAll, mRpx, mR, "height"),
        marginBottom: getMargin(mAllpx, mAll, mBpx, mB, "height"),
        marginLeft: getMargin(mAllpx, mAll, mLpx, mL, "height"),
        fontFamily,
      },
    });
  },
  getHashFromProps,
);

export const getTextStyleFromProps = memoize(
  ({
    textAlign,
    alignSelf,
    color,
    superScriptTextColor,
    disabled,
    size,
    fontWeight,
    fontFamily: fontFamilyProp,
    bold,
    mAll,
    mAllpx,
    mT,
    mTpx,
    mR,
    mRpx,
    mB,
    mBpx,
    mL,
    mLpx,
    underline,
    flex,
    letterSpacing,
    lineHeight,
    backgroundColor,
    hOrP,
  }) => {
    const textSizeStyle = getTextStyle(size, hOrP);
    const applyLetterSpacing = getLetterSpacing(letterSpacing);
    const fontFamily = fontFamilyProp || textSizeStyle.fontFamily;

    return StyleSheet.create({
      text: {
        ...textSizeStyle,
        ...applyLetterSpacing,
        ...getLineHeight(lineHeight),
        ...getBackgroundColor(),
        textAlign,
        alignSelf,
        color: getTextColor(color, disabled),
        fontWeight: getFontWeight(fontWeight, bold),
        marginTop: getMargin(mAllpx, mAll, mTpx, mT, "height"),
        marginRight: getMargin(mAllpx, mAll, mRpx, mR, "height"),
        marginBottom: getMargin(mAllpx, mAll, mBpx, mB, "height"),
        marginLeft: getMargin(mAllpx, mAll, mLpx, mL, "height"),
        textDecorationLine: getTextDecorationLine(underline),
        flex,
        fontFamily,
      },
      superScriptText: {
        textAlignVertical: "top",
        fontSize: 10,
        zIndex: 1000,
        position: "relative",
        color: getTextColor(superScriptTextColor, disabled),
        fontFamily,
      },
    });
  },
  getHashFromProps,
);
