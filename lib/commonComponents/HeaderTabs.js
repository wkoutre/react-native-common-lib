import React from "react";
import PropTypes from "prop-types";
import {
  NativeModules,
  LayoutAnimation,
  ViewPropTypes,
  View,
  StyleSheet
} from "react-native";
import { HText, Touchable } from "./";
import { CommonStyles, WIDTH, HEIGHT } from "../commonAssets";
import { defaultRefs, getGlobalColors } from "../commonHelpers";

// for using LayoutAnimation on Android
if (NativeModules.UIManager.setLayoutAnimationEnabledExperimental) {
  NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);
}

const localStyles = StyleSheet.create({
  container: {
    // height: "9%",
    flexDirection: "row",
    backgroundColor: getGlobalColors().gray,
    // width: WIDTH,
    alignItems: "center",
    justifyContent: "space-around"
  },
  toggleContainer: {
    // height: "100%"
  },
  textStyle: { paddingVertical: HEIGHT * 0.005 }
});

const ToggleItem = ({
  toggle,
  color,
  borderStyle,
  onPress,
  size,
  textStyle,
  shouldAnimate,
  activeToggle,
  HTextProps,
  bold,
  renderCustomObj
}) => {
  const handlOnPress = () => {
    if (shouldAnimate && activeToggle !== toggle) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    onPress(toggle);
  };

  const { toggle: renderCustomToggle, func } = renderCustomObj;

  return (
    <Touchable
      style={[CommonStyles.centerAll, localStyles.toggleContainer, borderStyle]}
      onPress={handlOnPress}
    >
      {toggle === renderCustomToggle && typeof func === "function"
        ? func()
        : null}
      <View style={[CommonStyles.flexRow, CommonStyles.centerAll]}>
        <HText
          bold={bold}
          size={size}
          color={color}
          style={[localStyles.textStyle, textStyle]}
          text={toggle}
          {...HTextProps}
        />
      </View>
    </Touchable>
  );
};

const HeaderTabs = props => {
  const {
    size,
    toggles,
    activeToggle,
    onPress,
    textStyle,
    textColor,
    activeBorderStyle,
    containerStyle,
    activeTextColor,
    shouldAnimate,
    HTextProps,
    bold,
    renderCustomObj // { toggle: "", renderFunc: func }
  } = props;

  const toggleViews = toggles.map((toggle, i) => {
    const isActive = toggle === activeToggle;
    const borderStyle = isActive ? activeBorderStyle : props.borderStyle;
    const color = isActive ? activeTextColor : textColor;

    return (
      <ToggleItem
        renderCustomObj={renderCustomObj}
        bold={bold}
        HTextProps={HTextProps}
        activeToggle={activeToggle}
        shouldAnimate={shouldAnimate}
        textStyle={textStyle}
        key={toggle}
        size={size}
        toggle={toggle}
        color={color}
        borderStyle={borderStyle}
        onPress={onPress}
      />
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
  activeBorderStyle: ViewPropTypes.style,
  activeTextColor: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  bold: PropTypes.bool,
  HTextProps: PropTypes.object, // to pass into the HText rendered in a ToggleItem,
  renderCustomObj: PropTypes.shape({
    toggle: PropTypes.text,
    func: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  })
};

HeaderTabs.defaultProps = {
  size: 3,
  textColor: "white",
  activeTextColor: "black",
  containerStyle: defaultRefs.emptyObj,
  textStyle: defaultRefs.emptyObj,
  borderStyle: defaultRefs.emptyObj,
  activeBorderStyle: defaultRefs.emptyObj,
  shouldAnimate: false,
  bold: false,
  HTextProps: {},
  renderCustomObj: {
    toggle: "",
    func: false
  }
};

export { HeaderTabs };
