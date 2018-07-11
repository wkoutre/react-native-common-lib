import React from "react";
import PropTypes from "prop-types";
import {
  ViewPropTypes,
  StyleSheet,
  InteractionManager,
  View
} from "react-native";
import Modal from "react-native-modal";
import { PText, HText, Button } from "./";
import { defaultRefs, getGlobalColors } from "../commonHelpers";

const X_MARGIN = 0;

const localStyles = StyleSheet.create({
  alertModalContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: getGlobalColors().blue,
    elevation: 3,
    shadowColor: getGlobalColors().offWhite,
    borderBottomWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 5,
      height: 10
    }
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%"
  },
  button1Style: {
    flex: 1,
    backgroundColor: getGlobalColors().darkGray
  },
  button2Style: {
    flex: 1,
    backgroundColor: getGlobalColors().lightBlue
  },
  button3Style: {
    flex: 1,
    backgroundColor: getGlobalColors().lightGray
  }
});

const CommonAlert = props => {
  const { useInteractionManager } = props;

  const handleButton1Press = () => {
    if (!props.isFatalError) {
      props.hideAlert();
    }

    if (useInteractionManager) {
      InteractionManager.runAfterInteractions(props.button1Press);
    } else {
      prop.button1Press();
    }
  };

  const handleButton2Press = () => {
    if (props.autoHide) {
      props.hideAlert();
    }

    if (useInteractionManager) {
      InteractionManager.runAfterInteractions(props.button2Press);
    } else {
      props.button2Press();
    }
  };

  const handleButton3Press = () => {
    if (props.autoHide) {
      props.hideAlert();
    }

    if (useInteractionManager) {
      InteractionManager.runAfterInteractions(props.button3Press);
    } else {
      props.button3Press();
    }
  };

  const renderButton1 = () => {
    const {
      button1TextColor,
      button1Text,
      button2Text,
      button1Style,
      allCustomButtonStyles
    } = props;

    const buttonStyle = allCustomButtonStyles
      ? button1Style
      : [localStyles.button1Style, button1Style];

    const mR = button2Text !== "" ? 1.25 : 0;
    return (
      <Button
        onPress={handleButton1Press}
        title={button1Text}
        buttonStyle={buttonStyle}
        color={button1TextColor}
        mT={1.5}
        mR={mR}
      />
    );
  };

  const renderButton2 = () => {
    const {
      button2Text,
      button3Text,
      button2Style,
      button2TextColor,
      allCustomButtonStyles
    } = props;
    const mR = button3Text ? 1.25 : 0;

    const buttonStyle = allCustomButtonStyles
      ? button2Style
      : [localStyles.button2Style, button2Style];

    if (button2Text) {
      return (
        <Button
          onPress={handleButton2Press}
          title={button2Text}
          buttonStyle={buttonStyle}
          color={button2TextColor}
          mT={1.5}
          mR={mR}
          mL={0}
        />
      );
    }

    return null;
  };

  const renderButton3 = () => {
    const {
      button3Text,
      button3Style,
      button3TextColor,
      allCustomButtonStyles
    } = props;

    const buttonStyle = allCustomButtonStyles
      ? button3Style
      : [localStyles.button3Style, button3Style];

    if (button3Text) {
      return (
        <Button
          onPress={handleButton3Press}
          title={button3Text}
          buttonStyle={buttonStyle}
          color={button3TextColor}
          mT={1.5}
          mR={1.25}
          mL={0}
        />
      );
    }

    return null;
  };

  const handleHideAlert = () => {
    const { handleBackdrop, hideAlert } = props;

    if (handleBackdrop) {
      hideAlert();
    }
  };

  const {
    isVisible,
    title,
    body,
    animationIn,
    animationOut,
    titleTextColor,
    bodyTextColor,
    alertContainerStyle,
    allCustomContainerStyles,
    HeaderHTextProps,
    useNativeDriver
  } = props;

  const handleOnModalHide = () => {
    const { clearAlert, onModalHide } = props;

    onModalHide();
    clearAlert();
  };

  const containerStyle = allCustomContainerStyles
    ? alertContainerStyle
    : [localStyles.alertModalContainer, alertContainerStyle];
  const buttonContainerStyle = allCustomContainerStyles
    ? alertContainerStyle
    : [localStyles.buttonContainer, props.buttonContainerStyle];

  return (
    <Modal
      onBackButtonPress={handleHideAlert}
      onBackdropPress={handleHideAlert}
      isVisible={isVisible}
      onModalHide={handleOnModalHide}
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      animationIn={animationIn}
      animationOut={animationOut}
      useNativeDriver={useNativeDriver}
      hideModalContentWhileAnimating={useNativeDriver}
    >
      <View style={containerStyle}>
        <HText
          textAlign={"center"}
          center
          mL={X_MARGIN}
          mR={X_MARGIN}
          mB={5}
          text={title}
          color={titleTextColor}
          size={1}
          {...HeaderHTextProps}
        />

        {!!body && (
          <PText
            textAlign={"center"}
            mL={X_MARGIN}
            mR={X_MARGIN}
            mB={2.5}
            text={body}
            color={bodyTextColor}
            size={1}
          />
        )}

        <View style={buttonContainerStyle}>
          {renderButton1()}
          {renderButton2()}
          {renderButton3()}
        </View>
      </View>
    </Modal>
  );
};

CommonAlert.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  button1Text: PropTypes.string,
  button1TextColor: PropTypes.string,
  button1Style: ViewPropTypes.style,
  button1Press: PropTypes.func,
  button2Text: PropTypes.string,
  button2TextColor: PropTypes.string,
  button2Style: ViewPropTypes.style,
  button2Press: PropTypes.func,
  button3Text: PropTypes.string,
  button3TextColor: PropTypes.string,
  button3Style: ViewPropTypes.style,
  button3Press: PropTypes.func,
  onModalHide: PropTypes.func,
  isFatalError: PropTypes.bool,
  autoHide: PropTypes.bool,
  handleBackdrop: PropTypes.bool,
  hideAlert: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  titleTextColor: PropTypes.string,
  bodyTextColor: PropTypes.string,
  alertContainerStyle: ViewPropTypes.style,
  buttonContainerStyle: ViewPropTypes.style,
  allCustomContainerStyles: PropTypes.bool,
  allCustomButtonStyles: PropTypes.bool,
  HeaderHTextProps: PropTypes.object, // to pass into the HText,
  useNativeDriver: PropTypes.bool,
  useInteractionManager: PropTypes.bool
};

CommonAlert.defaultProps = {
  isVisible: false,
  title: "",
  body: "",
  button1Text: "Okay",
  button1TextColor: "white",
  button1Style: defaultRefs.emptyObj,
  button1Press: defaultRefs.nullFunc,
  button2Text: "",
  button2TextColor: "white",
  button2Style: defaultRefs.emptyObj,
  button3Text: "",
  button3TextColor: "white",
  button3Style: defaultRefs.emptyObj,
  button3Press: defaultRefs.nullFunc,
  button2Press: defaultRefs.nullFunc,
  autoHide: true,
  onModalHide: PropTypes.nullFunc,
  isFatalError: false,
  handleBackdrop: true,
  animationIn: "fadeIn",
  animationOut: "fadeOut",
  titleTextColor: "white",
  bodyTextColor: "lightGray",
  alertContainerStyle: defaultRefs.emptyObj,
  buttonContainerStyle: defaultRefs.emptyObj,
  allCustomContainerStyles: false,
  allCustomButtonStyles: false,
  HeaderHTextProps: defaultRefs.emptyObj,
  useNativeDriver: false,
  useInteractionManager: false
};

export { CommonAlert };
