import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes, StyleSheet, Text, View } from "react-native";
import { Touchable } from "./";
import { CommonStyles } from "../commonAssets";
import {
  getDisabledColorFromString,
  getColorFromString,
  nToPercent,
  defaultRefs,
  getGlobalTextStyles,
} from "../commonHelpers";

const PText = props => {
  const {
    color,
    size,
    mT,
    bold,
    mR,
    mB,
    mL,
    mAll,
    superScriptText,
    superScriptTextColor,
    disabled,
    letterSpacing,
    lineHeight,
    flex,
    mBpx,
    mTpx,
    mLpx,
    mRpx,
    textAlign,
    alignSelf,
    textProps,
    fontWeight,
  } = props;
  const textColor = disabled
    ? getDisabledColorFromString(color)
    : getColorFromString(color);
  const convertedSuperScriptTextColor = disabled
    ? getDisabledColorFromString(superScriptTextColor)
    : getColorFromString(superScriptTextColor);

  const TextStyles = getGlobalTextStyles();

  const textSizeStyle = TextStyles[`p${size}`];

  const applyLetterSpacing = letterSpacing
    ? { letterSpacing }
    : defaultRefs.emptyObj;

  const applyLineHeight = lineHeight ? { lineHeight } : defaultRefs.emptyObj;

  const localStyle = StyleSheet.create({
    text: {
      textAlign,
      alignSelf,
      color: textColor,
      fontWeight: bold ? bold : fontWeight,
      marginTop: mTpx || nToPercent(mT, "height") || nToPercent(mAll, "height"),
      marginRight: mRpx || nToPercent(mR, "width") || nToPercent(mAll, "width"),
      marginBottom:
        mBpx || nToPercent(mB, "height") || nToPercent(mAll, "height"),
      marginLeft: mLpx || nToPercent(mL, "width") || nToPercent(mAll, "width"),
      flex,
    },
    superScriptText: {
      textAlignVertical: "top",
      fontSize: 10,
      zIndex: 1000,
      position: "relative",
      color: convertedSuperScriptTextColor,
    },
  });

  if (!superScriptText)
    return (
      <Text
        {...textProps}
        style={[
          textSizeStyle,
          localStyle.text,
          applyLetterSpacing,
          applyLineHeight,
          props.style,
        ]}
      >
        {props.text}
      </Text>
    );

  return (
    <View style={CommonStyles.flexRow}>
      <Text
        {...textProps}
        style={[textSizeStyle, localStyle.text, props.style]}
      >
        {props.text}
      </Text>
      <Text style={localStyle.superScriptText}>{superScriptText}</Text>
    </View>
  );
};

PText.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  color: PropTypes.string,
  mAll: PropTypes.number,
  mB: PropTypes.number,
  mL: PropTypes.number,
  mR: PropTypes.number,
  mT: PropTypes.number,
  size: PropTypes.number,
  style: ViewPropTypes.style,
  textAlign: PropTypes.string,
  alignSelf: PropTypes.string,
  superScriptText: PropTypes.string,
  superScriptTextColor: PropTypes.string,
  bold: PropTypes.bool,
  disabled: PropTypes.bool,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  flex: PropTypes.number,
  mBpx: PropTypes.number,
  mTpx: PropTypes.number,
  mLpx: PropTypes.number,
  mRpx: PropTypes.number,
  textProps: PropTypes.object,
  fontWeight: PropTypes.string,
};

PText.defaultProps = {
  size: 3,
  color: "black",
  style: defaultRefs.emptyObj,
  mT: 0,
  mR: 0,
  mB: 0,
  mL: 0,
  mAll: 0,
  mBpx: 0,
  mTpx: 0,
  mLpx: 0,
  mRpx: 0,
  textAlign: "left",
  alignSelf: "flex-start",
  superScriptText: "",
  superScriptTextColor: "black",
  bold: false,
  disabled: false,
  letterSpacing: 0,
  lineHeight: 0,
  flex: 0,
  textProps: defaultRefs.emptyObj,
  fontWeight: "normal",
};

export { PText };
