# react-native-common-lib

A lightweight library of reusable React Native components built from the ground up with a functional-styling designed API.

## SETUP

In your project, create directories (folders) called `Colors` and `TextStyles`, respectively.

In each folder, create:

1) `index.js` file
2) `Colors.js` or `TextStyles.js` file
3) `package.json` file

`index.js` should look like:

#### [Colors/TextStyles]/index.js


```
export * from './Colors'
```

or

```
export * from './TextStyles'
```


#### Colors.js and TextStyles.js

```
export const Colors = {
  green: "rgb(126, 201, 108)",
  disabledGreen: "rgba(126, 201, 108, 0.7)",
  yellow: "rgb(220, 200, 0)",
  disabledYellow: "rgba(220, 200, 0, 0.7)"
};
```

Please see `./examples` for more code examples on setting up these two files.

#### package.json

The `package.json` should look like:

```
{
    "name": "@Colors"
}
```

