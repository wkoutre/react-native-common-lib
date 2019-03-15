import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Image } from "react-native";
import { Touchable, PText, HText } from ".";
import {
  defaultRefs,
  getImageSource,
  getButtonStyleFromProps,
} from "../commonHelpers";

const { emptyObj } = defaultRefs;

// IF THE TITLE PROP IS DEFINED, IT WILL RENDER A 'TITLED BUTTON'
// ELSE, IT WILL RENDER A BUTTON WITH ALL CHILDREN INSIDE

const Button = (props) => {
  const {
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
    // locally used props
    resizeMode,
    imageStyle,
    activeOpacity,
    image,
    title,
    onPress,
    header,
    commonTextProps,
    textStyle,
    buttonStyle,
    disableType,
    ...otherProps
  } = props;

  const TextToUse = header ? HText : PText;

  const localStyles = getButtonStyleFromProps({
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
  });

  const renderInside = () => {
    if (disabled && disableType === "spin") {
      return <ActivityIndicator size={"small"} />;
    }

    if (title && !image) {
      return <TextToUse {...commonTextProps} text={title} style={textStyle} />;
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
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[localStyles.button, buttonStyle]}
      {...otherProps}
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
  mAllpx: PropTypes.number,
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
  commonTextProps: PropTypes.object,
  disableType: PropTypes.oneOf(["spin", "default"]),
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
  mAllpx: 0,
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
  commonTextProps: emptyObj,
  disableType: "default",
};

export { Button };
