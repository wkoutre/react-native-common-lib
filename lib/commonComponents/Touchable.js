import React from "react";
import PropTypes from "prop-types";
import { debounce } from "underscore";
import { TouchableOpacity } from "react-native";

const Touchable = props => {
  const handleOnPress = debounce(props.onPress, 750, true);
  const { activeOpacity, noOpacity } = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={noOpacity ? 1 : activeOpacity}
      onPress={handleOnPress}
    >
      {props.children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  noOpacity: PropTypes.bool,
  activeOpacity: PropTypes.number
};

Touchable.defaultProps = {
  noOpacity: false,
  activeOpacity: 0.7
};

export { Touchable };
