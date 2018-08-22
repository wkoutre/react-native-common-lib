import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes, Text, StyleSheet } from "react-native";
import {
  getColorFromString,
  nToPercent,
  getDisabledColorFromString,
  getGlobalTextStyles,
  defaultRefs,
} from "../commonHelpers";

const HText = props => {
  const {
    color,
    size,
    bold,
    mT,
    mR,
    mB,
    mL,
    mBpx,
    mTpx,
    mLpx,
    mRpx,
    mAll,
    mAllPx,
    underline,
    letterSpacing,
    backgroundColor,
    disabled,
    numberOfLines,
    flex,
    textAlign,
    alignSelf,
    textProps,
    fontWeight,
    fontFamily: fontFamilyProp,
  } = props;
  const textColor = disabled
    ? getDisabledColorFromString(color)
    : getColorFromString(color);
  const TextStyles = getGlobalTextStyles();

  const textSizeStyle = TextStyles[`h${size}`];
  const fontFamily = fontFamilyProp || textSizeStyle.fontFamily;

  const localStyles = {
    text: {
      fontWeight: bold ? "bold" : fontWeight,
      textAlign,
      alignSelf,
      marginTop:
        mAllPx ||
        mTpx ||
        nToPercent(mT, "height") ||
        nToPercent(mAll, "height"),
      marginRight:
        mAllPx || mRpx || nToPercent(mR, "width") || nToPercent(mAll, "width"),
      marginBottom:
        mAllPx ||
        mBpx ||
        nToPercent(mB, "height") ||
        nToPercent(mAll, "height"),
      marginLeft:
        mAllPx || mLpx || nToPercent(mL, "width") || nToPercent(mAll, "width"),
      color: textColor,
      textDecorationLine: underline ? "underline" : "none",
      flex,
      fontFamily,
    },
  };

  if (backgroundColor) {
    localStyles.text.backgroundColor = getColorFromString(backgroundColor);
  }

  const applyLetterSpacing = letterSpacing
    ? { letterSpacing }
    : defaultRefs.emptyObj;

  return (
    <Text
      {...textProps}
      style={[textSizeStyle, localStyles.text, applyLetterSpacing, props.style]}
      numberOfLines={numberOfLines}
    >
      {props.text}
    </Text>
  );
};

HText.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mAll: PropTypes.number,
  mT: PropTypes.number,
  mR: PropTypes.number,
  mB: PropTypes.number,
  mL: PropTypes.number,
  mBpx: PropTypes.number,
  mTpx: PropTypes.number,
  mLpx: PropTypes.number,
  mRpx: PropTypes.number,
  mAllPx: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  underline: PropTypes.bool,
  bold: PropTypes.bool,
  letterSpacing: PropTypes.number,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  numberOfLines: PropTypes.number,
  flex: PropTypes.number,
  textAlign: PropTypes.string,
  alignSelf: PropTypes.string,
  textProps: PropTypes.object,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
};

HText.defaultProps = {
  color: "black",
  size: 1,
  mAll: 0,
  mT: 0,
  mR: 0,
  mB: 0,
  mL: 0,
  mBpx: 0,
  mTpx: 0,
  mLpx: 0,
  mRpx: 0,
  mAllPx: 0,
  style: defaultRefs.emptyObj,
  underline: false,
  bold: false,
  letterSpacing: 0,
  backgroundColor: "",
  disabled: false,
  numberOfLines: null,
  flex: 0,
  textAlign: "left",
  alignSelf: "auto",
  textProps: defaultRefs.emptyObj,
  fontWeight: "normal",
  fontFamily: "",
};

/*
    TODO:
    - standardize textProps for HText and PText with a TS @interface
    - TypeScript definitions
*/

export { HText };
