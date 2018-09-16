import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes, Text } from "react-native";
import { debounce } from "underscore";
import { Touchable } from ".";
import { defaultRefs, getTouchableTextStyleFromProps } from "../commonHelpers";

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
    mAllpx,
    header,
    text,
    color,
    onPress,
    disabled,
    bold,
    fontWeight,
    size,
    onLayout,
    fontFamily,
    textStyle,
    ...otherProps
  } = props;

  const localStyles = getTouchableTextStyleFromProps({
    color,
    disabled,
    fontWeight,
    fontFamily,
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
  });

  const handleOnPress = debounce(onPress, 500, true);

  return (
    <Touchable {...otherProps} onPress={handleOnPress}>
      <Text style={[localStyles.text, textStyle]} onLayout={onLayout}>
        {text}
      </Text>
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
  hitSlop: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
  mBpx: PropTypes.number,
  mTpx: PropTypes.number,
  mLpx: PropTypes.number,
  mRpx: PropTypes.number,
  mAllpx: PropTypes.number,
  onLayout: PropTypes.func,
  fontFamily: PropTypes.string,
  style: ViewPropTypes.style,
  textStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
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
  mAllpx: 0,
  fontWeight: "",
  hitSlop: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
  onLayout: defaultRefs.nullFunc,
  fontFamily: "",
  style: defaultRefs.emptyObj,
  textStyle: defaultRefs.emptyObj,
};

export { TouchableText };
