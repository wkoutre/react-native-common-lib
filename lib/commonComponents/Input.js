import React from "react";
import PropTypes from "prop-types";
import {
  ViewPropTypes,
  TextInput,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { CommonIcons } from "../commonAssets";
import { PText, HText, Touchable } from "./";
import {
  defaultRefs,
  getColorFromString,
  getGlobalColors,
  getGlobalTextStyles,
  nToPercent,
} from "../commonHelpers";

const localStyles = StyleSheet.create({
  bluePasswordEye: {
    width: 20,
  },
  inputLabel: { letterSpacing: 5.0 },
  wordCount: {
    position: "absolute",
    bottom: 7.5,
    right: 7.5,
  },
});

class Input extends React.Component {
  constructor(props) {
    super(props);
    this._inputRef = null;
  }

  getWordCount = (val = "") => {
    const { value } = this.props;

    const valToUse = val || value;

    if (valToUse) {
      return valToUse
        .split(" ")
        .map(t => t.trim())
        .filter(l => !!l).length;
    }

    return 0;
  };

  handleOnChangeText = text => {
    const { wordCount, onChangeText } = this.props;

    if (wordCount) {
      const currentWordCount = this.getWordCount(text);

      if (currentWordCount === wordCount + 1) {
        return null;
      }
    }

    return onChangeText(text);
  };

  handlePress = () => {
    const { onPress, disabled } = this.props;
    // console.log(`Handling press, _inputRef:`, this._inputRef);
    // console.log(`Handling press, this.props.onPress`, this.props.onPress);

    if (onPress) {
      this.props.onPress();
    } else if (!disabled && this._inputRef && !this._inputRef.isFocused()) {
      console.log(`Input is not focused: Focusing.`);
      this._inputRef.focus();
    }
  };

  handleOnSubmitEditing = () => {
    if (this._inputRef) {
      // console.log(`THERE'S an _inputRef!`);
    } else {
      console.log(`THERE'S NO _inputRef...`);
    }

    this.props.onSubmitEditing();
  };

  handleOnKeyPress = event => {
    const { multiline } = this.props;

    if (multiline) {
      // console.log(`key press event:`, event);
    }
  };

  renderWordCount = () => {
    const { wordCount, accentColor, wordCountBgColor } = this.props;

    if (wordCount) {
      const currentWordCount = this.getWordCount();

      return (
        <View
          style={[localStyles.wordCount, { backgroundColor: wordCountBgColor }]}
        >
          <PText
            color={accentColor}
            text={`${currentWordCount} Word Count (${wordCount})`}
          />
        </View>
      );
    }

    return null;
  };

  renderPasswordToggle = () => {
    const {
      password,
      passwordToggleFunc,
      eyeColor,
      passwordEyeIcon,
    } = this.props;

    if (password) {
      return (
        <Touchable onPress={passwordToggleFunc}>
          <Image
            style={localStyles.bluePasswordEye}
            resizeMode={"contain"}
            source={passwordEyeIcon || CommonIcons[`${eyeColor}PasswordEye`]}
          />
        </Touchable>
      );
    }

    return null;
  };

  renderLabel = () => {
    const { label, labelSize, labelStyle, accentColor } = this.props;

    if (label) {
      return (
        <HText
          text={label}
          color={accentColor}
          size={labelSize}
          style={[localStyles.inputLabel, labelStyle]}
        />
      );
    }

    return null;
  };

  handleRef = input => {
    this._inputRef = input;
  };

  render() {
    const {
      value,
      placeholder,
      placeholderTextColor,
      secureTextEntry,
      selectionColor,
      keyboardType,
      mAll,
      mT,
      mR,
      mB,
      mL,
      mBpx,
      mTpx,
      mLpx,
      mRpx,
      pL,
      pR,
      pT,
      pB,
      accentColor,
      backgroundColor,
      multiline,
      fontSize,
      defaultValue,
      borderWidth,
      returnKeyType,
      selectTextOnFocus,
      autoFocus,
      width,
      maxLength,
      keyboardAppearance,
      autoCapitalize,
      autoCorrect,
      editable,
      borderBottomWidth,
      numberOfLines,
      returnKeyLabel,
      inputContainerStyle,
    } = this.props;

    const color = getColorFromString(accentColor);
    const convertedPlaceholderTextColor = getColorFromString(
      placeholderTextColor,
    );

    const styles = {
      inputStyle: {
        color,
        paddingRight: pR,
        paddingLeft: pL,
        paddingTop: pT,
        paddingBottom: pB,
        fontSize,
        minHeight: 35,
        backgroundColor,
        flex: 1,
      },
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth,
        borderBottomWidth,
        borderTopColor: color,
        borderBottomColor: color,
        borderRightColor: color,
        borderLeftColor: color,
      },
      containerStyle: {
        marginTop:
          mTpx || nToPercent(mT, "height") || nToPercent(mAll, "height"),
        marginRight:
          mRpx || nToPercent(mR, "width") || nToPercent(mAll, "width"),
        marginBottom:
          mBpx || nToPercent(mB, "height") || nToPercent(mAll, "height"),
        marginLeft:
          mLpx || nToPercent(mL, "width") || nToPercent(mAll, "width"),
        alignItems: "flex-start",
        width,
      },
    };

    const marginStyle = mAll ? { margin: mAll } : defaultRefs.emptyObj;

    return (
      <Touchable
        activeOpacity={0.9}
        onPress={this.handlePress}
        style={[styles.containerStyle, marginStyle, this.props.containerStyle]}
      >
        {this.renderLabel()}
        <View
          style={[styles.inputContainer, inputContainerStyle]}
          pointerEvents={this.props.onPress ? "none" : "box-none"}
        >
          <TextInput
            ref={this.handleRef}
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            placeholderTextColor={convertedPlaceholderTextColor}
            selectionColor={selectionColor}
            autoCorrect={autoCorrect}
            style={[styles.inputStyle, this.props.inputStyle]}
            value={value}
            onChangeText={this.handleOnChangeText}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            defaultValue={defaultValue}
            returnKeyType={returnKeyType}
            onSubmitEditing={this.handleOnSubmitEditing}
            selectTextOnFocus={selectTextOnFocus}
            onFocus={this.handlePress}
            autoFocus={autoFocus}
            maxLength={maxLength}
            keyboardAppearance={keyboardAppearance}
            editable={editable}
            numberOfLines={numberOfLines}
            returnKeyLabel={returnKeyLabel}
            onKeyPress={this.handleOnKeyPress}
          />
          {this.renderPasswordToggle()}
        </View>
        {this.renderWordCount()}
      </Touchable>
    );
  }
}

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholderTextColor: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  passwordToggleFunc: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  selectionColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  inputStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  inputContainerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  mAll: PropTypes.number,
  mB: PropTypes.number,
  mL: PropTypes.number,
  mR: PropTypes.number,
  mT: PropTypes.number,
  mBpx: PropTypes.number,
  mTpx: PropTypes.number,
  mLpx: PropTypes.number,
  mRpx: PropTypes.number,
  pL: PropTypes.number,
  pR: PropTypes.number,
  pT: PropTypes.number,
  pB: PropTypes.number,
  fontSize: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  accentColor: PropTypes.string,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  selectTextOnFocus: PropTypes.bool,
  borderWidth: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keyboardAppearance: PropTypes.string,
  label: PropTypes.string,
  labelSize: PropTypes.number,
  labelStyle: ViewPropTypes.style,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoCorrect: PropTypes.bool,
  password: PropTypes.bool,
  onPress: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  wordCount: PropTypes.number,
  numberOfLines: PropTypes.number,
  eyeColor: PropTypes.string,
  editable: PropTypes.bool,
  returnKeyLabel: PropTypes.string,
  wordCountBgColor: PropTypes.string,
  disabled: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  passwordEyeIcon: PropTypes.number,
};

Input.defaultProps = {
  placeholderTextColor: "darkPlaceholder",
  selectionColor: getGlobalColors().gray,
  placeholder: "Enter text here...",
  secureTextEntry: false,
  mT: 0,
  mR: 0,
  mB: 0,
  mL: 0,
  mAll: 0,
  mBpx: 0,
  mTpx: 0,
  mLpx: 0,
  mRpx: 0,
  pL: 0,
  pR: 0,
  pT: 0,
  pB: 0,
  fontSize: 18,
  width: "100%",
  maxLength: 150,
  autoFocus: false,
  accentColor: "blue",
  returnKeyType: "default",
  onSubmitEditing: defaultRefs.nullFunc,
  autoCapitalize: "sentences",
  keyboardType: "default",
  selectTextOnFocus: false,
  borderWidth: 0,
  borderBottomWidth: 1,
  defaultValue: "",
  keyboardAppearance: "dark",
  multiline: false,
  label: "",
  labelSize: 4,
  labelStyle: defaultRefs.emptyObj,
  containerStyle: defaultRefs.emptyObj,
  inputContainerStyle: defaultRefs.emptyObj,
  backgroundColor: getGlobalColors().transparent,
  autoCorrect: false,
  onPress: false,
  password: false,
  passwordToggleFunc: false,
  wordCount: 0,
  numberOfLines: 1,
  inputStyle: defaultRefs.emptyObj,
  eyeColor: "blue",
  editable: true,
  returnKeyLabel: "",
  wordCountBgColor: getGlobalColors().transparent,
  disabled: false,
  passwordEyeIcon: null,
};

export { Input };
