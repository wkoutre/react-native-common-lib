import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { CommonStyles } from "../commonAssets";
import { defaultRefs, getTextStyleFromProps } from "../commonHelpers";

const PText = (props) => {
  const {
    color,
    size,
    bold,
    mT,
    mR,
    mB,
    mL,
    mAll,
    mAllpx,
    mBpx,
    mTpx,
    mLpx,
    mRpx,
    superScriptTextColor,
    fontFamily,
    disabled,
    letterSpacing,
    lineHeight,
    flex,
    textAlign,
    alignSelf,
    fontWeight,
    // not passed to getTextStyleFromProps
    superScriptText,
    style,
    text,
    onLayout,
    textProps,
    ...otherProps
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
    mAll,
    mAllpx,
    mBpx,
    mTpx,
    mLpx,
    mRpx,
    superScriptTextColor,
    fontFamily,
    disabled,
    letterSpacing,
    lineHeight,
    flex,
    textAlign,
    alignSelf,
    fontWeight,
    hOrP: "p",
  });

  if (!superScriptText)
    return (
      <Text
        {...textProps}
        {...otherProps}
        style={[localStyles.text, style]}
        onLayout={onLayout}
      >
        {text}
      </Text>
    );

  return (
    <View style={CommonStyles.flexRow}>
      <Text
        {...textProps}
        {...otherProps}
        style={[localStyles.text, props.style]}
        onLayout={onLayout}
      >
        {props.text}
      </Text>
      <Text style={localStyles.superScriptText}>{superScriptText}</Text>
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
  mAllpx: PropTypes.number,
  mB: PropTypes.number,
  mL: PropTypes.number,
  mR: PropTypes.number,
  mT: PropTypes.number,
  mBpx: PropTypes.number,
  mTpx: PropTypes.number,
  mLpx: PropTypes.number,
  mRpx: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  textAlign: PropTypes.string,
  alignSelf: PropTypes.string,
  superScriptText: PropTypes.string,
  superScriptTextColor: PropTypes.string,
  bold: PropTypes.bool,
  disabled: PropTypes.bool,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  flex: PropTypes.number,
  textProps: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  onLayout: PropTypes.func,
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
  mAllpx: 0,
  mBpx: 0,
  mTpx: 0,
  mLpx: 0,
  mRpx: 0,
  textAlign: "left",
  alignSelf: "auto",
  superScriptText: "",
  superScriptTextColor: "black",
  bold: false,
  disabled: false,
  letterSpacing: 0,
  lineHeight: 0,
  flex: 0,
  textProps: defaultRefs.emptyObj,
  fontWeight: "normal",
  fontFamily: "",
  onLayout: defaultRefs.nullFunc,
};

export { PText };
