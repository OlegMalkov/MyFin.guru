/* @flow */

const
  topBarHeight = 40,
  makeValueSelectorContainerStyle = (props?: { width: number }) => ({
    height: topBarHeight,
    width: props ? props.width : null,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

export {
  topBarHeight,
  makeValueSelectorContainerStyle,
};
