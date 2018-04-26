import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, ViewPropTypes } from "react-native";
import { defaultRefs, IOSX } from "@commonAssets";

export const IphoneXAwareView = props => {
  if (IOSX) {
    return (
      <SafeAreaView
        {...props}
        style={[props.style, { backgroundColor: props.backgroundColor }]}
      >
        {props.children}
      </SafeAreaView>
    );
  }
  return <View {...props}>{props.children}</View>;
};

IphoneXAwareView.propTypes = {
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  style: ViewPropTypes
    ? ViewPropTypes.style
    : PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number])
};

IphoneXAwareView.defaultProps = {
  style: defaultRefs.emptyObj
};
