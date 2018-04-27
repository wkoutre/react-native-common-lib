import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { debounce } from "underscore";
import { Touchable } from "./";
import {
  defaultRefs,
  nToPercent,
  getColorFromString,
  getDisabledColorFromString,
  getGlobalTextStyles
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
    mB,
    mL,
    mR,
    mT,
    title,
    padX,
    padY,
    padAll,
    labelSize,
    disabled,
    borderWidth,
    borderColor,
    bold
  } = props;

  const GlobalTextStyles = getGlobalTextStyles();

  const convertedBackgroundColor = disabled
    ? getDisabledColorFromString(backgroundColor)
    : getColorFromString(backgroundColor);
  const convertedColor = getColorFromString(color);
  const convertedBorderColor = getColorFromString(borderColor || color);

  const labelStyle = GlobalTextStyles[`h${labelSize}`];

  const localStyles = StyleSheet.create({
    text: {
      color: convertedColor,
      alignSelf: "center",
      textAlign: "center",
      fontWeight: bold ? "bold" : "normal"
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      alignSelf,
      backgroundColor: convertedBackgroundColor,
      marginLeft: nToPercent(mL),
      marginRight: nToPercent(mR),
      marginBottom: nToPercent(mB),
      marginTop: nToPercent(mT),
      paddingTop: padAll || padY,
      paddingBottom: padAll || padY,
      paddingRight: padAll || padX,
      paddingLeft: padAll || padX,
      borderWidth,
      borderColor: convertedBorderColor
    }
  });

  const renderInside = () => {
    if (title) {
      return (
        <Text style={[localStyles.text, labelStyle, props.textStyle]}>
          {title}
        </Text>
      );
    }

    return [props.children];
  };

  return (
    <Touchable
      {...props}
      onPress={onPress}
      activeOpacity={0.7}
      style={[localStyles.button, props.buttonStyle]}
    >
      {renderInside()}
    </Touchable>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  alignSelf: PropTypes.string,
  backgroundColor: PropTypes.string,
  buttonStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  color: PropTypes.string,
  mB: PropTypes.number,
  mL: PropTypes.number,
  mR: PropTypes.number,
  mT: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  textStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  title: PropTypes.string,
  padX: PropTypes.number,
  padY: PropTypes.number,
  padAll: PropTypes.number,
  labelSize: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  bold: PropTypes.bool
};

Button.defaultProps = {
  alignSelf: "stretch",
  backgroundColor: "blue",
  buttonStyle: emptyObj,
  color: "white",
  mB: 0,
  mL: 0,
  mR: 0,
  mT: 0,
  padAll: 0,
  padX: 0,
  padY: 15,
  textStyle: emptyObj,
  title: "",
  labelSize: 3,
  disabled: false,
  borderWidth: 0,
  borderColor: false,
  bold: false
};

export { Button };
