import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { defaultRefs, getColorFromString } from "../commonHelpers";

const FillCircle = props => {
  const { size, isFilled, emptyColor, filledColor, borderWidth } = props;
  const converted = {
    filledColor: getColorFromString(filledColor),
    emptyColor: getColorFromString(emptyColor)
  };

  const localStyles = StyleSheet.create({
    containerCircle: {
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth,
      borderColor: converted.filledColor
    },
    filledCircle: {
      backgroundColor: converted.filledColor,
      width: size * 0.75,
      height: size * 0.75,
      borderRadius: size * 0.75 / 2
    },
    emptyCircle: {
      backgroundColor: converted.emptyColor,
      width: size * 0.75,
      height: size * 0.75,
      borderRadius: size * 0.75 / 2
    }
  });

  return (
    <View style={[localStyles.containerCircle, props.style]}>
      <View
        style={isFilled ? localStyles.filledCircle : localStyles.emptyCircle}
      />
    </View>
  );
};

FillCircle.propTypes = {
  size: PropTypes.number,
  isFilled: PropTypes.bool,
  emptyColor: PropTypes.string,
  filledColor: PropTypes.string,
  borderWidth: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

FillCircle.defaultProps = {
  size: 20,
  isFilled: false,
  emptyColor: "white",
  filledColor: "blue",
  borderWidth: 1,
  style: defaultRefs.emptyObj
};

export { FillCircle };
