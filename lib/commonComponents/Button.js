import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { Touchable, PText, HText } from ".";
import {
  defaultRefs,
  nToPercent,
  getColorFromString,
  getDisabledColorFromString,
  getImageSource,
} from "../commonHelpers";

const { emptyObj } = defaultRefs;

// IF THE TITLE PROP IS DEFINED, IT WILL RENDER A 'TITLED BUTTON'
// ELSE, IT WILL RENDER A BUTTON WITH ALL CHILDREN INSIDE

const Button = props => {
  const {
    alignSelf,
    backgroundColor,
    onPress,
    color,
    title,
    padX,
    padY,
    padAll,
    disabled,
    borderWidth,
    borderColor,
    image,
    resizeMode,
    imageStyle,
    activeOpacity,
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
    header,
    textProps,
    textStyle,
    buttonStyle,
  } = props;

  const convertedBackgroundColor = disabled
    ? getDisabledColorFromString(backgroundColor)
    : getColorFromString(backgroundColor);
  const convertedBorderColor = getColorFromString(borderColor || color);

  const TextToUse = header ? HText : PText;

  const localStyles = {
    button: {
      alignItems: "center",
      justifyContent: "center",
      alignSelf,
      backgroundColor: convertedBackgroundColor,
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
      paddingTop: padAll || padY,
      paddingBottom: padAll || padY,
      paddingRight: padAll || padX,
      paddingLeft: padAll || padX,
      borderWidth,
      borderColor: convertedBorderColor,
    },
  };

  const renderInside = () => {
    if (title && !image) {
      return <TextToUse {...textProps} text={title} style={textStyle} />;
    }

    if (image && !title) {
      const source = getImageSource(image);

      return (
        <Image source={source} resizeMode={resizeMode} style={imageStyle} />
      );
    }

    // TODO: Add image prop WITH title

    return [props.children];
  };

  return (
    <Touchable
      {...props}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[localStyles.button, buttonStyle]}
    >
      {renderInside()}
    </Touchable>
  );
};

Button.propTypes = {
  activeOpacity: PropTypes.number,
  disabled: PropTypes.bool,
  alignSelf: PropTypes.string,
  backgroundColor: PropTypes.string,
  buttonStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  color: PropTypes.string,
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
  onPress: PropTypes.func.isRequired,
  textStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  title: PropTypes.string,
  padX: PropTypes.number,
  padY: PropTypes.number,
  padAll: PropTypes.number,
  labelSize: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  image: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
  resizeMode: PropTypes.string,
  imageStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  header: PropTypes.bool,
  textProps: PropTypes.object,
};

Button.defaultProps = {
  activeOpacity: 0.7,
  alignSelf: "auto",
  backgroundColor: "blue",
  buttonStyle: emptyObj,
  color: "white",
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
  padAll: 0,
  padX: 0,
  padY: 0,
  textStyle: emptyObj,
  title: "",
  labelSize: 3,
  disabled: false,
  borderWidth: 0,
  borderColor: false,
  image: false,
  resizeMode: "contain",
  imageStyle: emptyObj,
  header: false,
  textProps: emptyObj,
};

export { Button };
