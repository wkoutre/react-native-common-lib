import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, ViewPropTypes } from "react-native";
import { IOSX } from "../commonAssets";
import { defaultRefs } from "../commonHelpers";

export const IphoneXAwareView = props => {
  if (IOSX) {
    return (
      <SafeAreaView
        {...props}
        style={[props.style, { backgroundColor: props.backgroundColor }]}
        onLayout={props.onLayout}
      >
        {props.children}
      </SafeAreaView>
    );
  }
  return <View {...props}>{props.children}</View>;
};

IphoneXAwareView.propTypes = {
  onLayout: PropTypes.func,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  style: ViewPropTypes
    ? ViewPropTypes.style
    : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.number,
      ]),
};

IphoneXAwareView.defaultProps = {
  onLayout: defaultRefs.nullFunc,
  style: defaultRefs.emptyObj,
};
