import { StyleSheet } from "react-native";

const DEFAULT_PARAGRAPH_SIZES = {
  p1: 18,
  p2: 16,
  p3: 14,
  p4: 12,
  p5: 10,
  p6: 8
};
const DEFAULT_HEADER_SIZES = {
  h1: 30,
  h2: 26,
  h3: 22,
  h4: 20,
  h5: 18,
  h6: 16
};
const DEFAULT_H_FONT_WEIGHT = "300";
const DEFAULT_P_FONT_WEIGHT = "300";
const DEFAULT_FONT_FAMILY = "System";

class CreateTextStyles {
  constructor(config = {}) {
    const {
      paragraphSizes = DEFAULT_PARAGRAPH_SIZES,
      headerSizes = DEFAULT_HEADER_SIZES,
      hFontWeight = DEFAULT_H_FONT_WEIGHT,
      pFontWeight = DEFAULT_P_FONT_WEIGHT,
      fontFamily = DEFAULT_FONT_FAMILY,
      applyPLetterSpacing = false,
      applyHLetterSpacing = false
    } = config;

    this.paragraphSizes = paragraphSizes || DEFAULT_PARAGRAPH_SIZES;
    this.headerSizes = headerSizes;
    this.hFontWeight = hFontWeight;
    this.pFontWeight = pFontWeight;
    this.fontFamily = fontFamily;
    this.applyPLetterSpacing = applyPLetterSpacing;
    this.applyHLetterSpacing = applyHLetterSpacing;
    this.allTextStyles = this.buildTextStyles();
  }

  get allTextStyles() {
    return this.allTextStyles;
  }

  buildTextStyles = () => {
    return StyleSheet.create({
      ...this.createParFontStyleObj(),
      ...this.createHeaderFontStyleObj()
    });
  };

  createParFontStyleObj = () => {
    const paragraphStyles = {};

    Object.keys(this.paragraphSizes).forEach(key => {
      const fontSize = this.paragraphSizes[key];

      paragraphStyles[key] = {
        fontFamily: this.fontFamily,
        fontSize: this.fontSize,
        fontWeight: this.pFontWeight,
        lineHeight: fontSize * 1.65
      };

      if (this.applyPLetterSpacing) {
        paragraphStyles[key].letterSpacing = fontSize / 12;
      }
    });

    return paragraphStyles;
  };

  createHeaderFontStyleObj = () => {
    const headerStyles = {};

    Object.keys(this.headerSizes).forEach(key => {
      const fontSize = this.headerSizes[key];

      headerStyles[key] = {
        fontFamily: this.fontFamily,
        fontSize: this.fontSize,
        fontWeight: this.pFontWeight,
        lineHeight: fontSize * 1.65
      };

      if (this.applyHLetterSpacing) {
        headerStyles[key].letterSpacing = fontSize / 12;
      }
    });

    return headerStyles;
  };
}

const DefaultTextStyles = new CreateTextStyles();

export { CreateTextStyles, DefaultTextStyles };
