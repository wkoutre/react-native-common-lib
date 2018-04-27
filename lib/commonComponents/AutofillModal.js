/*
    INCOMPLETE:

    - Header
*/

import React from "react";
import PropTypes from "prop-types";
import { Modal, View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import KeyboardSpacer from "react-native-keyboard-spacer";
import {
  PlatformAwareKeyboardSpacer,
  FillCircle,
  Touchable,
  Header,
  HText,
  FadeInView,
  Input,
  CommonAlert
} from "./";
import { Colors, CommonStyles, IOS, WIDTH, HEIGHT } from "../../assets";
import {
  getColorFromString,
  showDivider,
  defaultNetworkAlert
} from "../../lib";
import Config from "../../config";

const { nullFunc } = Config;

// pass justList prop to be a simple modal with choices coming from searchResults prop (array of strings)

const localStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width: WIDTH
  },
  autofillModal: {
    flex: 1,
    width: WIDTH
  },
  touchableContainer: {
    width: "95%"
  },
  touchable: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10
  },
  rowTouchable: {
    flexDirection: "row",
    alignItems: "center"
  },
  modalStyle: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1
  }
});

class AutofillModal extends React.PureComponent {
  state = {
    searchText: ""
  };

  componentWillMount() {
    console.log(`AUTOFILL MODAL IS MOUNTING`);
  }

  componentWillUnmount() {
    console.log(`AUTOFILL MODAL IS UNMOUNTING`);
  }

  handleSave = async obj => {
    const { resultIsPressed, onClose, multiSelect } = this.props;

    if (this.props.API) {
      try {
        const success = await resultIsPressed(obj);

        return this.handleOnClose();
      } catch (err) {
        console.log(`ERROR HANDLING AUTOFILLMODAL SAVE`, err);

        this.handleOnClose();
        return defaultNetworkAlert();
      }
    } else if (!multiSelect) {
      resultIsPressed(obj);
      return this.handleOnClose();
    }

    return resultIsPressed(obj);
  };

  handleOnClose = () => {
    this.setState({ searchText: "" });
    this.props.onClose();
  };

  mapSearchResultData = data => {
    const {
      textColor,
      backgroundColor: preBgColor,
      multiSelect,
      selectedResults
    } = this.props;
    const backgroundColor = getColorFromString(preBgColor);

    const tempStyle = StyleSheet.create({
      text: {
        padding: 10,
        backgroundColor
      }
    });

    const isFilled = selectedResults.includes(data);

    return (
      <View key={data} style={localStyles.touchableContainer}>
        <Touchable
          activeOpacity={0.7}
          onPress={() => this.handleSave(data)}
          style={[
            localStyles.touchable,
            multiSelect && localStyles.rowTouchable
          ]}
        >
          {multiSelect && <FillCircle isFilled={isFilled} />}
          <HText
            text={data}
            size={3}
            color={textColor}
            style={tempStyle.text}
          />
        </Touchable>
        {showDivider({
          backgroundColor: Colors.gray,
          alignSelf: "center"
        })}
      </View>
    );
  };

  handleOnChangeText = searchText => {
    const { handleFiltering } = this.props;

    if (handleFiltering) {
      this.setState({ searchText });
    } else {
      this.props.onChangeText(searchText);
    }
  };

  renderAPIResults = () => {
    // assumes coming from Google places API
    // refactor when necessary to choose from another API data source

    const {
      searchResults,
      backgroundColor: preBgColor,
      textColor,
      API
    } = this.props;

    const backgroundColor = getColorFromString(preBgColor);
    const tempStyle = StyleSheet.create({
      text: {
        padding: 10,
        backgroundColor
      }
    });

    if (API) {
      if (searchResults && searchResults.length > 0) {
        const resultList = searchResults.map(obj => {
          return (
            <Touchable
              key={obj.placeId}
              activeOpacity={0.7}
              onPress={() => this.handleSave(obj)}
              style={{ width: "95%" }}
            >
              , multiSelect{" "}
              <HText
                text={obj.address}
                size={4}
                color={textColor}
                style={tempStyle.text}
              />
              {showDivider({
                backgroundColor: Colors.gray,
                alignSelf: "center"
              })}
            </Touchable>
          );
        });

        return (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={"never"}
            enableOnAndroid={!IOS}
            enableResetScrollToCoords
            // contentContainerStyle={Styles.centerAll}
          >
            <FadeInView style={CommonStyles.centerAll}>{resultList}</FadeInView>
          </KeyboardAwareScrollView>
        );
      }

      return null;
    }

    return null;
  };

  renderNonAPIResults = () => {
    const {
      searchResults,
      backgroundColor: preBgColor,
      handleFiltering,
      justList,
      API
    } = this.props;
    const { searchText } = this.state;

    if (!API) {
      if (searchResults && searchResults.length > 0) {
        const resultList = handleFiltering
          ? searchResults
              .filter(name =>
                name.toLowerCase().startsWith(searchText.toLowerCase())
              )
              .map(this.mapSearchResultData)
          : searchResults.map(this.mapSearchResultData);

        return (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={"never"}
            enableOnAndroid={!IOS}
            enableResetScrollToCoords
            // contentContainerStyle={Styles.centerAll}
          >
            <FadeInView style={CommonStyles.centerAll}>{resultList}</FadeInView>
          </KeyboardAwareScrollView>
        );
      }
    }

    return null;
  };

  render() {
    const {
      isVisible,
      onChangeText,
      handleFiltering,
      placeholder,
      navigation,
      titleCenter,
      titleRight,
      titleLeft,
      headerBackgroundColor,
      headerTextColor,
      backgroundColor,
      defaultValue,
      API,
      justList,
      value,
      backArrow,
      animationIn,
      animationOut,
      animationType,
      hardwareAccelerated,
      useNativeDriver
    } = this.props;
    const { searchText } = this.state;

    return (
      <Modal
        visible={isVisible}
        onRequestClose={this.handleOnClose}
        onChangeText={onChangeText}
        backgroundColor={backgroundColor}
        onBackdropPress={this.handleOnClose}
        modalStyle={localStyles.modalStyle}
        hardwareAccelerated={hardwareAccelerated}
        useNativeDriver={useNativeDriver}
        // animationIn={animationIn}
        // animationOut={animationOut}
        animationType={animationType}
        // containerStyle={localStyles.containerStyle}
      >
        <Header
          navigation={navigation}
          titleCenter={titleCenter}
          titleRight={titleRight}
          titleLeft={titleLeft}
          leftAction={this.handleOnClose}
          backgroundColor={headerBackgroundColor}
          color={headerTextColor}
          backArrow={backArrow}
        />

        <CommonAlert />
        <View style={[localStyles.autofillModal, { backgroundColor }]}>
          {!justList && (
            <Input
              underlineColorAndroid="transparent"
              value={handleFiltering ? searchText : value}
              autoFocus
              defaultValue={defaultValue}
              onChangeText={this.handleOnChangeText}
              placeholder={placeholder}
              placeholderTextColor={Colors.placeholder}
              keyboardAppearance={"dark"}
              onFocus={() => onChangeText(defaultValue)}
            />
          )}

          {this.renderAPIResults()}
          {this.renderNonAPIResults()}
          <PlatformAwareKeyboardSpacer searchModal />
        </View>
      </Modal>
    );
  }
}

AutofillModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  titleCenter: PropTypes.string.isRequired,
  titleLeft: PropTypes.string,
  titleRight: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  searchResults: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  resultIsPressed: PropTypes.func.isRequired,
  handleFiltering: PropTypes.bool,
  justList: PropTypes.bool,
  multiSelect: PropTypes.bool,
  maxSelection: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backArrow: PropTypes.bool,
  headerBackgroundColor: PropTypes.string,
  headerTextColor: PropTypes.string,
  selectedResults: PropTypes.array,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  animationType: PropTypes.string,
  hardwareAccelerated: PropTypes.bool,
  useNativeDriver: PropTypes.bool
};

AutofillModal.defaultProps = {
  value: "",
  titleLeft: "Back",
  titleRight: "",
  backgroundColor: "white",
  textColor: "blue",
  handleFiltering: false,
  onChangeText: nullFunc,
  justList: false,
  multiSelect: false,
  maxSelection: 5,
  placeholder: "Enter text here...",
  backArrow: true,
  headerBackgroundColor: "blue",
  headerTextColor: "lightBlue",
  selectedResults: [],
  animationIn: "slideInUp",
  animationOut: "slideInDown",
  animationType: "slide",
  hardwareAccelerated: !IOS,
  useNativeDriver: true
};

export { AutofillModal };
