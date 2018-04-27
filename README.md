# react-native-common-lib

A lightweight library of reusable React Native components built from the ground up with a functional-styling designed API.

## DEFAULT SETUP

The first two objects that need setting up are `GlobalColors` and `GlobalTextStyles`.

Two classes provided by this library help with this:

- [https://github.com/wkoutre/react-native-common-lib/blob/master/lib/commonAssets/CreateTextStyles.js](./lib/commonAssets/CreateTextStyles) : `CreateTextStyles`
- [https://github.com/wkoutre/react-native-common-lib/blob/master/lib/commonHelpers/index.js](./lib/commonHelpers/index.js): `CommonAssets`


#### CreateTextStyles

`CreateTextStyles` takes a `textStylesConfig` object with the following shape:

```
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
```

```
textStylesConfig = {
      paragraphSizes = DEFAULT_PARAGRAPH_SIZES,
      headerSizes = DEFAULT_HEADER_SIZES,
      hFontWeight = DEFAULT_H_FONT_WEIGHT,
      pFontWeight = DEFAULT_P_FONT_WEIGHT,
      fontFamily = DEFAULT_FONT_FAMILY,
      applyPLetterSpacing = false,
      applyHLetterSpacing = false
}
```

[https://github.com/wkoutre/react-native-common-lib/blob/master/lib/commonAssets/CreateTextStyles.js](./lib/commonAssets/CreateTextStyles) creates and exports the `DefaultTextStyles` class.

Import to note is that a class that's an `instanceof CreateTextStyles` has a `getter`: `get allTextStyles` which returns the `TextStyles` React Native StyleSheet object created when instantiating the `CreateTextStyles` class.

#### CommonAssets

Within [https://github.com/wkoutre/react-native-common-lib/blob/master/lib/commonHelpers/index.js](./lib/commonHelpers/index.js), there is a `CommonAssets` class. It takes a `config` object with the following shape:

```
{
    Colors,
    TextStyles,
    textStylesConfig
}
```

Please see [https://github.com/wkoutre/react-native-common-lib/blob/master/example/ExampleColors/ExampleColors.js](./example/ExampleColors) for an example `Colors` object.

By default, [https://github.com/wkoutre/react-native-common-lib/blob/master/lib/commonHelpers/index.js](./lib/commonHelpers/index.js) creates and exports `DefaultCommonAssets`, which is an `instanceof` the `CommonAssets` class instantiated with the default params, using `DefaultTextStyles` as the `TextStyles` param in the `config`.

The `CommonAssets` class has two `getters`:

```
get colors() {
    return this.Colors;
}

get textStyles() {
    return this.TextStyles;
}
```

## CUSTOM SETUP

Default `TextStyles` and `Colors` are created by default so that the rest of the `CommonComponents` have `TextStyles` and `Colors` to use.

Of course, though, you want to customize! To do that:

```
import { CommonAssets, CreateTextStyles } from "react-native-common-lib";
import { MyColors } from "../path/to/your/Colors/object"

// see above for shape of textStylesConfig
const textStylesConfig = {
    ...
}
```

```
// **OPTION 1:**
const MyTextStyles = new CreateTextStyles(textStylesConfig)
const MyAssets = new CommonAssets({ TextStyles: MyTextStyles, Colors: MyColors })
```

```
**OPTION 2:**
const MyAssets = new CommonAssets({ textStylesConfig, Colors: MyColors })
```

Whenever a new `CommonAssets` class is created, `GlobalColors` and `GlobalTextStyles` are reassigned within `./lib/commonHelpers/index.js`

`GlobalColors` and `GlobalTextStyles` are `require`d inline in the `CommonComponents` which rely on them.

Therefore, best practice is to create your own custom instances of `CreateTextStyles` and `CommonAssets` via one of the two options outlined above in a file that's subsequently `require`d or `import`ed by your `Root.js`, `index.js`, `App.js`, or similar file within your project's directory structure.

## Common Components

- Button
- CommonAlert: useful as a custom Alert component
- CommonModal
- CommonSwitch
- Container
- FadeInView
- FillCircle
- HeaderTabs
- HText
- PText
- Input
- IPhoneXAwareView
- PlatformAwareKeyboardSpacer
- Touchable


## Background

Each of these components are used in (at the time of creation) as many as 5 production React Native applications. Their API is described via `PropTypes` and have minimal `defaultProp` configurations that I've tried to reconcile to have the least impact out of the box. Aka, no weird margins, paddings, default styles or button presses, etc.

I've ported each of these from various projects I've worked on, making some tweaks as I built this to be published on NPM. Therefore, there are likely some bugs -- probably in UI -- that will need to be squashed in the first few `minor` releases.

There are more I need to add! But I've put this off long enough and wanted to get it up and running as I continue to create a React Native boilerplate of sorts to get projects up and running for my team and me.

Why did I create these with so many libraries out there?  For the sake of learning how to better create clean, customizable, and re-usable components.

Libraries like `react-native-elements` are great and extremely useful -- but they stifle true growth of learning and development (in my opinion) when habitually used blindly.

Anyway, please create issues, PRs, etc., and...

**Enjoy!**
