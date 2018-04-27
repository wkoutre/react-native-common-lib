import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, ViewPropTypes } from "react-native";
import { Switch } from "react-native-switch";
import { CommonIcons, HEIGHT, CommonStyles } from "../commonAssets";

const localStyles = StyleSheet.create({
  greenCheck: {
    height: 10,
    width: 13
  }
});

const RMMSwitch = props => {
  const circleSize = props.barHeight * 0.9;
  const barHeight = circleSize * 1.25;

  const renderInsideCircle = () => {
    const { value, imageResizeMode } = props;

    if (value) {
      return (
        <Image
          source={CommonIcons.greenCheck}
          style={localStyles.greenCheck}
          resizeMode={imageResizeMode}
        />
      );
    }

    return (
      <Image
        style={localStyles.greenCheck}
        source={CommonIcons.grayX}
        resizeMode={imageResizeMode}
      />
    );
  };

  return (
    <Switch
      {...props}
      circleSize={circleSize}
      barHeight={barHeight}
      innerCircleStyle={props.innerCircleStyle}
      renderInsideCircle={renderInsideCircle}
    />
  );
};

RMMSwitch.propTypes = {
  activeText: PropTypes.string,
  inActiveText: PropTypes.string,
  innerCircleStyle: ViewPropTypes.style,
  circleActiveColor: PropTypes.string,
  circleInActiveColor: PropTypes.string,
  backgroundActive: PropTypes.string,
  backgroundInactive: PropTypes.string,
  circleBorderWidth: PropTypes.number,
  barHeight: PropTypes.number,
  outerCircleStyle: ViewPropTypes.style,
  switchLeftPx: PropTypes.number,
  switchRightPx: PropTypes.number,
  switchWidthMultiplier: PropTypes.number,
  value: PropTypes.bool.isRequired,
  imageResizeMode: PropTypes.string
};

RMMSwitch.defaultProps = {
  activeText: "",
  inActiveText: "",
  innerCircleStyle: CommonStyles.centerAll,
  circleActiveColor: getGlobalColors().white,
  circleInActiveColor: getGlobalColors().white,
  backgroundActive: getGlobalColors().green,
  backgroundInactive: getGlobalColors().gray,
  circleBorderWidth: 0,
  barHeight: HEIGHT * 0.0385,
  outerCircleStyle: {},
  switchLeftPx: 1.3,
  switchRightPx: 1.4,
  switchWidthMultiplier: 2.75,
  imageResizeMode: "contain"
};

export { RMMSwitch };
