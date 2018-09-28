import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { debounce } from "underscore";

class Touchable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleOnPress = debounce(this.props.onPress, 750, true);

  render(): React.ReactNode {
    const { children, noOpacity, activeOpacity, ...otherProps } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={noOpacity ? 1 : activeOpacity}
        onPress={this.handleOnPress}
        {...otherProps}
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
};

Touchable.defaultProps = {
  noOpacity: false,
  activeOpacity: 0.7,
};

export { Touchable };
