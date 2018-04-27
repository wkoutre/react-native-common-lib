import { StyleSheet, Platform, Dimensions } from "react-native";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const IOS = Platform.OS === "ios";
export const IOSX = HEIGHT === 812 && IOS;
export const COMPOSER_HEIGHT = 65;
export const navTopHeight = IOS ? 65 : 56.6;

export const defaultMarginTopContainer = IOS ? 35 : 25;

export const defaultScrollViewProps = {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false
};

export const defaultSubContainerWidth = width => {
  const percent = width / 100;

  return {
    marginTop: defaultMarginTopContainer,
    flex: 1,
    alignSelf: "center",
    width: percent * WIDTH
  };
};

export const CommonStyles = StyleSheet.create({
  noOpacity: {
    opacity: 0
  },
  fullOpacity: {
    opacity: 1
  },
  noMarginOrPadding: {
    margin: 0,
    padding: 0
  },
  flex1: {
    flex: 1
  },
  flexRow: {
    flexDirection: "row"
  },
  flexRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  fullWidth: {
    width: WIDTH
  },
  alignSelfStart: {
    alignSelf: "flex-start"
  },
  alignSelfEnd: {
    alignSelf: "flex-end"
  },
  alignSelfCenter: {
    alignSelf: "center"
  },
  alignCenter: {
    alignItems: "center"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  justifySb: {
    justifyContent: "space-between"
  },
  justifSp: {
    justifyContent: "space-around"
  },
  fullContainer: {
    flex: 1,
    width: WIDTH,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  fullContainerWidth: {
    width: WIDTH
  },
  fullWidthSubContainerWithHeader: {
    // marginTop: IOS ? 15 : 10,
    flex: 1,
    width: WIDTH
  },
  fullWidthSubContainer: {
    marginTop: defaultMarginTopContainer,
    flex: 1,
    width: WIDTH
  },
  defaultSubContainer: {
    marginTop: defaultMarginTopContainer,
    flex: 1,
    alignSelf: "center",
    width: WIDTH * 0.9
  },
  defaultSubContainerPad: {
    marginTop: defaultMarginTopContainer,
    flex: 1,
    alignSelf: "center",
    width: WIDTH * 0.9
  },
  defaultSubContainerNoMargin: {
    flex: 1,
    alignSelf: "center",
    width: WIDTH * 0.9
  },
  defaultTopSpacing: {
    paddingTop: navTopHeight - IOS ? 15 : 5
  },
  centerTop: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  centerTopRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  centerAll: {
    alignItems: "center",
    justifyContent: "center"
  },
  alignAllLeft: {
    alignItems: "flex-start"
  },
  leftCenterRow: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  offScreen: {
    position: "absolute",
    height: 0,
    width: 0
  }
});
