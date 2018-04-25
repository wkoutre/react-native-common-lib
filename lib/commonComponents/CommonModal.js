import React from "react";
import PropTypes from "prop-types";
import { StatusBar, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { CommonStyles, IOS } from "@commonAssets";
import { defaultRefs, getColorFromString } from "@commonHelpers";
import { IphoneXAwareView } from "./";

const localStyles = StyleSheet.create({
  fixBottomModalMargin: {
    marginBottom: IOS ? -10 : 0
  }
});

const CommonModal = props => {
  const {
    onRequestClose,
    onShow,
    isVisible,
    hardwareAccelerated,
    backgroundColor: preBgColor,
    containerStyle,
    modalStyle,
    onBackdropPress,
    animationInTiming,
    animationOutTiming,
    animationIn,
    animationOut,
    onModalHide,
    useNativeDriver,
    hideStatus,
    fixBottomMargin
  } = props;

  const backgroundColor = getColorFromString(preBgColor);

  return (
    <Modal
      onRequestClose={onRequestClose || onBackdropPress}
      onShow={onShow}
      isVisible={isVisible}
      hardwareAccelerated={hardwareAccelerated}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackdropPress}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      style={[
        CommonStyles.noMarginOrPadding,
        modalStyle,
        fixBottomMargin ? localStyles.fixBottomModalMargin : {}
      ]}
      animationIn={animationIn}
      animationOut={animationOut}
      onModalHide={onModalHide}
      useNativeDriver={useNativeDriver}
    >
      <StatusBar hidden={hideStatus} />
      <IphoneXAwareView
        style={[
          CommonStyles.flex1,
          CommonStyles.centerAll,
          { backgroundColor },
          containerStyle
        ]}
      >
        {props.children}
      </IphoneXAwareView>
    </Modal>
  );
};

CommonModal.propTypes = {
  onRequestClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onShow: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  hardwareAccelerated: PropTypes.bool,
  backgroundColor: PropTypes.string,
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  modalStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  onBackdropPress: PropTypes.func.isRequired,
  animationInTiming: PropTypes.number,
  animationOutTiming: PropTypes.number,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  onModalHide: PropTypes.func,
  hideStatus: PropTypes.bool,
  useNativeDriver: PropTypes.bool,
  fixBottomMargin: PropTypes.bool
};

CommonModal.defaultProps = {
  onShow: defaultRefs.nullFunc,
  hardwareAccelerated: !IOS,
  backgroundColor: "white",
  containerStyle: defaultRefs.emptyObj,
  modalStyle: defaultRefs.emptyObj,
  animationInTiming: 400,
  animationOutTiming: 400,
  animationIn: "slideInUp",
  animationOut: "slideOutDown",
  onModalHide: defaultRefs.nullFunc,
  onRequestClose: false,
  hideStatus: false,
  useNativeDriver: !IOS,
  fixBottomMargin: true
};

export { CommonModal };
