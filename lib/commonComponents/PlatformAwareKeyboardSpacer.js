import React from "react";
import KeyboardSpacer from "react-native-keyboard-spacer";
import PropTypes from "prop-types";
import { View } from "react-native";
import { IOS, HEIGHT } from "../commonAssets";

const PlatformAwareKeyboardSpacer = props => {
  const { showIos, searchModal, topSpacing } = props;

  if (IOS) {
    if (showIos) {
      return <KeyboardSpacer topSpacing={topSpacing} {...props} />;
    }

    return <View />;
  }

  return (
    <KeyboardSpacer
      {...props}
      topSpacing={searchModal ? -HEIGHT / 2 : topSpacing}
    />
  );
};

PlatformAwareKeyboardSpacer.propTypes = {
  searchModal: PropTypes.bool,
  showIos: PropTypes.bool,
  topSpacing: PropTypes.number
};

PlatformAwareKeyboardSpacer.defaultProps = {
  searchModal: false,
  showIos: true,
  topSpacing: IOS ? -HEIGHT / 3 : -110
};

export { PlatformAwareKeyboardSpacer };
