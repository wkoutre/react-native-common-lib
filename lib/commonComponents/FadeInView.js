import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Animated } from "react-native";
import { Touchable } from "./";
import { defaultRefs } from "../commonHelpers";

const localStyles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
});

class FadeInView extends React.PureComponent {
  state = {
    fadeAnim: new Animated.Value(0), // Initial value for opacity
  };

  componentDidMount() {
    const { duration, useNativeDriver } = this.props;
    console.log(`FADE IN VIEW: MOUNTED`);

    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1,
        duration,
        useNativeDriver,
      },
    ).start(); // Starts the animation
  }

  componentWillReceiveProps(nextProps) {
    const { fadeOut: nextFadeOut } = nextProps;
    const { fadeOut, duration, useNativeDriver } = this.props;

    if (!fadeOut && nextFadeOut) {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 0,
          duration,
          useNativeDriver,
        },
      ).start(); // Starts the animation
    } else if (fadeOut && !nextFadeOut) {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1,
          duration,
          useNativeDriver,
        },
      ).start(); // Starts the animation
    }
  }

  _getRef = e => {
    this._innerRef = e;
  };

  render() {
    const { fadeAnim } = this.state;
    const { onPress, onLayout } = this.props;

    return (
      <Animated.View
        {...this.props}
        ref={this._getRef}
        style={[
          this.props.style,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
        onLayout={onLayout}
      >
        {this.props.children}
        {!!onPress && (
          <Touchable onPress={onPress} style={localStyles.touchable} />
        )}
      </Animated.View>
    );
  }
}

FadeInView.propTypes = {
  duration: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  fadeOut: PropTypes.bool,
  useNativeDriver: PropTypes.bool,
  onPress: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onLayout: PropTypes.func,
};

FadeInView.defaultProps = {
  duration: 500,
  style: defaultRefs.emptyObj,
  fadeOut: false,
  useNativeDriver: true,
  onPress: false,
  onLayout: defaultRefs.nullFunc,
};

export { FadeInView };
