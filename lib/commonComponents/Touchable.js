import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { debounce } from "underscore";

class Touchable extends React.PureComponent {
  handleOnPress = debounce(this.props.onPress, this.props.debounceTime, true);

  render(): React.ReactNode {
    const { children, noOpacity, activeOpacity, ...otherProps } = this.props;

    return (
      <TouchableOpacity
        {...otherProps}
        activeOpacity={noOpacity ? 1 : activeOpacity}
        onPress={this.handleOnPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  noOpacity: PropTypes.bool,
  activeOpacity: PropTypes.number,
  debounceTime: PropTypes.number,
};

Touchable.defaultProps = {
  noOpacity: false,
  activeOpacity: 0.7,
  debounceTime: 500,
};

export { Touchable };
