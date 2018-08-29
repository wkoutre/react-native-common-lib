import React from "react";
import PropTypes from "prop-types";
import {
  StatusBar,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { CommonStyles, IOS } from "../commonAssets";
import { FadeInView } from "./";
import { defaultRefs } from "../commonHelpers";

const convertBarStyle = prop => {
  if (prop === "dark") return "dark-content";
  if (prop === "light") return "light-content";

  return "dark-content";
};

class Container extends React.PureComponent {
  _innerRef = null;

  _getRef = e => {
    this._innerRef = e;
  };

  renderStatusBar = () => {
    const { renderStatus, hideStatus, barStyle } = this.props;

    if (renderStatus) {
      return (
        <StatusBar hidden={hideStatus} barStyle={convertBarStyle(barStyle)} />
      );
    }

    return null;
  };

  render() {
    const { fade, children, style, onLayout, dismissKeyboard } = this.props;

    const ViewToUse = fade ? FadeInView : View;
    const childrenToUse = dismissKeyboard ? (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={CommonStyles.flex1}
      >
        <View style={CommonStyles.flex1}>{children}</View>
      </TouchableWithoutFeedback>
    ) : (
      children
    );

    return (
      <ViewToUse
        ref={this._getRef}
        {...this.props}
        style={[CommonStyles.fullContainer, style]}
        onLayout={onLayout}
      >
        {this.renderStatusBar()}
        {childrenToUse}
      </ViewToUse>
    );
  }
}

Container.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  barStyle: PropTypes.string,
  hideStatus: PropTypes.bool,
  fade: PropTypes.bool,
  renderStatus: PropTypes.bool,
  onLayout: PropTypes.func,
  dismissKeyboard: PropTypes.bool,
};

Container.defaultProps = {
  style: defaultRefs.emptyObj,
  barStyle: IOS ? "dark" : "light",
  hideStatus: false,
  fade: false,
  renderStatus: false,
  onLayout: defaultRefs.nullFunc,
  dismissKeyboard: false,
};

export { Container };
