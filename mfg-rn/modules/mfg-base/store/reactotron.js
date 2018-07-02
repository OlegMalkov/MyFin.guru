/* @flow */

/* TODO 4 MFG-40 flow any */
type Reactotron = {| createStore: any |}
let reactotron: Reactotron

export const
  initReactotron = (r: Reactotron) => reactotron = r,
  getReactotron = () => reactotron