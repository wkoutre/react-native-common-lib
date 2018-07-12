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

class Container extends React.PureComponent {
  _innerRef = null;

  _getRef = e => {
    this._innerRef = e;
  };

  renderStatusBar = () => {
    const { renderStatus } = this.props;

    if (renderStatus) {
      return (
        <StatusBar hidden={hideStatus} barStyle={convertBarStyle(barStyle)} />
      );
    }

    return null;
  };

  render() {
    const {
      renderStatus,
      hideStatus,
      barStyle,
      fade,
      defaultSubContainer,
      children,
      style
    } = this.props;

    const ViewToUse = fade ? FadeInView : View;
    const childrenToUse = defaultSubContainer ? (
      <View style={CommonStyles.defaultSubContainer}>{children}</View>
    ) : (
      children
    );

    return (
      <ViewToUse {...this.props} style={[CommonStyles.fullContainer, style]}>
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
