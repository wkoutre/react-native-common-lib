import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { defaultRefs, getTextStyleFromProps } from "../commonHelpers";

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
    mAllpx,
    underline,
    letterSpacing,
    backgroundColor,
    disabled,
    flex,
    textAlign,
    alignSelf,
    fontWeight,
    fontFamily,
    superScriptTextColor,
    // not passed to getTextStyleFromProps
    numberOfLines,
    onLayout,
    text,
    style,
    textProps,
  } = props;

  if (!text && text !== 0) {
    return null;
  }

  const localStyles = getTextStyleFromProps({
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
    mAllpx,
    underline,
    letterSpacing,
    backgroundColor,
    disabled,
    flex,
    textAlign,
    alignSelf,
    fontWeight,
    fontFamily,
    superScriptTextColor,
    hOrP: "h",
  });

  return (
    <Text
      {...textProps}
      style={[localStyles.text, style]}
      numberOfLines={numberOfLines}
      onLayout={onLayout}
    >
      {text}
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
  mAllpx: PropTypes.number,
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
  onLayout: PropTypes.func,
  superScriptTextColor: PropTypes.string,
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
  mAllpx: 0,
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
  onLayout: defaultRefs.nullFunc,
  superScriptTextColor: "black",
};

/*
    TODO:
    - standardize textProps for HText and PText with a TS @interface
    - TypeScript definitions
*/

export { HText };
