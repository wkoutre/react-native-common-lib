import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { debounce } from "underscore";
import { Touchable } from "./";
import {
  getColorFromString,
  getDisabledColorFromString,
  nToPercent,
  getGlobalTextStyles,
  getFontWeightFromProps
} from "../commonHelpers";

const TouchableText = props => {
  const {
    mT,
    mB,
    mL,
    mR,
    mAll,
    mBpx,
    mTpx,
    mLpx,
    mRpx,
    mAllPx,
    header,
    text,
    color,
    onPress,
    disabled,
    bold,
    fontWeight: fontWeightProp,
    size
  } = props;

  const TextStyles = getGlobalTextStyles();

  const textStyleFromSize = header
    ? TextStyles[`h${size}`]
    : TextStyles[`p${size}`];

  const fontWeight = getFontWeightFromProps({
    bold,
    fontWeight: fontWeightProp
  });

  const localStyles = StyleSheet.create({
    text: {
      color: disabled
        ? getDisabledColorFromString(color)
        : getColorFromString(color),
      lineHeight: null,
      fontWeight,
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
        mAllPx || mLpx || nToPercent(mL, "width") || nToPercent(mAll, "width")
    }
  });

  const handleOnPress = debounce(onPress, 500, true);

  return (
    <Touchable {...props} onPress={handleOnPress}>
      <Text style={[textStyleFromSize, localStyles.text]}>{text}</Text>
    </Touchable>
  );
};

TouchableText.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  bold: PropTypes.bool,
  header: PropTypes.bool,
  mAll: PropTypes.number,
  mT: PropTypes.number,
  mR: PropTypes.number,
  mB: PropTypes.number,
  mL: PropTypes.number,
  fontWeight: PropTypes.string,
  hitSlop: PropTypes.object,
  mBpx: PropTypes.number,
  mTpx: PropTypes.number,
  mLpx: PropTypes.number,
  mRpx: PropTypes.number,
  mAllPx: PropTypes.number
};

TouchableText.defaultProps = {
  color: "black",
  size: 1,
  disabled: false,
  bold: false,
  header: false,
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
  fontWeight: "",
  hitSlop: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  }
};

export { TouchableText };
