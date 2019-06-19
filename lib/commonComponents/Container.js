import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes, StatusBar, View } from "react-native";
import { CommonStyles, IOS } from "../commonAssets";
import { FadeInView } from "./";
import { defaultRefs, getBackgroundColor } from "../commonHelpers";

const convertBarStyle = (prop) => {
  if (prop === "dark") return "dark-content";
  if (prop === "light") return "light-content";

  return "dark-content";
};

class Container extends React.PureComponent {
  _innerRef = null;

  _getRef = (e) => {
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
    const {
      backgroundColor,
      fade,
      defaultSubContainer,
      children,
      style,
      ...otherProps
    } = this.props;

    const ViewToUse = fade ? FadeInView : View;
    const childrenToUse = defaultSubContainer ? (
      <View style={CommonStyles.defaultSubContainer}>{children}</View>
    ) : (
      children
    );
    const styleProp = backgroundColor
      ? [CommonStyles.fullContainer, getBackgroundColor(backgroundColor), style]
      : [
          CommonStyles.fullContainer,
          getBackgroundColor(backgroundColor),
          style,
        ];

    return (
      <ViewToUse {...otherProps} ref={this._getRef} style={styleProp}>
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
  defaultSubContainer: PropTypes.bool,
  renderStatus: PropTypes.bool,
  onLayout: PropTypes.func,
  backgroundColor: PropTypes.string,
  ...ViewPropTypes,
};

Container.defaultProps = {
  style: defaultRefs.emptyObj,
  barStyle: IOS ? "dark" : "light",
  hideStatus: false,
  fade: false,
  defaultSubContainer: false,
  renderStatus: false,
  onLayout: defaultRefs.nullFunc,
  backgroundColor: "",
};

export { Container };
