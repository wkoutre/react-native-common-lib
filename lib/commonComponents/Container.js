import React from "react";
import PropTypes from "prop-types";
import { StatusBar, View } from "react-native";
import { CommonStyles, IOS } from "../commonAssets";
import { FadeInView } from "./";
import { defaultRefs } from "../commonHelpers";

const convertBarStyle = prop => {
  if (prop === "dark") return "dark-content";
  if (prop === "light") return "light-content";

  return "dark-content";
};

const Container = props => {
  const {
    renderStatus,
    hideStatus,
    barStyle,
    fade,
    defaultSubContainer
  } = props;

  const ViewToUse = fade ? FadeInView : View;
  const childrenToUse = defaultSubContainer ? (
    <View style={CommonStyles.defaultSubContainer}>{props.children}</View>
  ) : (
    props.children
  );

  const renderStatusBar = () => {
    if (renderStatus) {
      return (
        <StatusBar hidden={hideStatus} barStyle={convertBarStyle(barStyle)} />
      );
    }

    return null;
  };

  return (
    <ViewToUse {...props} style={[CommonStyles.fullContainer, props.style]}>
      {renderStatusBar()}
      {childrenToUse}
    </ViewToUse>
  );
};

Container.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  barStyle: PropTypes.string,
  hideStatus: PropTypes.bool,
  fade: PropTypes.bool,
  defaultSubContainer: PropTypes.bool,
  renderStatus: PropTypes.bool
};

Container.defaultProps = {
  style: defaultRefs.emptyObj,
  barStyle: IOS ? "dark" : "light",
  hideStatus: false,
  fade: false,
  defaultSubContainer: false,
  renderStatus: false
};

export { Container };
