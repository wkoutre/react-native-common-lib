import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes, View, StyleSheet } from "react-native";
import { HText, Touchable } from "./";
import { CommonStyles, WIDTH } from "../commonAssets";
import { defaultRefs, getGlobalColors } from "../commonHelpers";

const localStyles = StyleSheet.create({
  container: {
    height: "9%",
    flexDirection: "row",
    backgroundColor: getGlobalColors().gray,
    width: WIDTH,
    alignItems: "center",
    justifyContent: "space-around"
  },
  toggleContainer: {
    height: "100%"
  },
  textStyle: { paddingVertical: "0.5%" }
});

const HeaderTabs = props => {
  const {
    size,
    toggles,
    activeToggle,
    onPress,
    textStyle,
    textColor,
    activeBorderStyle,
    containerStyle
  } = props;

  const toggleViews = toggles.map(toggle => {
    const borderStyle =
      toggle === activeToggle ? activeBorderStyle : props.borderStyle;

    return (
      <Touchable
        key={toggle}
        style={[
          CommonStyles.centerAll,
          localStyles.toggleContainer,
          borderStyle
        ]}
        onPress={() => onPress(toggle)}
      >
        <View style={[CommonStyles.flexRow, CommonStyles.centerAll]}>
          <HText
            size={size}
            color={textColor}
            style={[localStyles.textStyle, textStyle]}
            text={toggle}
          />
        </View>
      </Touchable>
    );
  });

  return (
    <View style={[localStyles.container, containerStyle]}>{toggleViews}</View>
  );
};

HeaderTabs.propTypes = {
  toggles: PropTypes.array.isRequired,
  activeToggle: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number,
  textColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  borderStyle: ViewPropTypes.style,
  activeBorderStyle: ViewPropTypes.style
};

HeaderTabs.defaultProps = {
  size: 3,
  textColor: "white",
  containerStyle: defaultRefs.emptyObj,
  textStyle: defaultRefs.emptyObj,
  borderStyle: defaultRefs.emptyObj,
  activeBorderStyle: defaultRefs.emptyObj
};

export { HeaderTabs };
