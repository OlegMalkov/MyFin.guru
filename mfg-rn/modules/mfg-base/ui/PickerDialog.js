/* @flow */

import React from 'react'
import { MyDialog } from './MyDialog'
import { DoneCancelRow } from './DoneCancelRow'
import { strings } from '../localization';
import { RNText, RNPicker, RNView } from './RNUI'

export type PickerValue<V> = {| label: string, value: V |}
export type Values<V> = Array<PickerValue<V>>

type State<V> = {|
  selectedValue: V,
  values: Values<V>,
|}

type Props<V> = {|
  opened: bool,
  values: Values<V>,
  blacklist?: Array<V>,
  selectedValue?: V,
  title?: string,
  onDone?: (value: V) => any,
  onCancel?: () => any,
|}

class PickerDialog<V> extends React.Component<Props<V>, State<V>> {
  constructor(props: Props<V>) {
    super(props)

    const fallbackValue: any = ''
    this.state = {
      selectedValue: props.values[0] ? props.values[0].value : fallbackValue,
      values: props.values,
    }
  }

  componentWillReceiveProps(newProps: Props<V>) {
    this._updateState(newProps)
  }

  _updateState(props: Props<V>) {
    const
      { blacklist = [] } = props,
      values = props.values.filter(({ value }) => blacklist.indexOf(value) === -1)

    try {
      if (values.length === 0) {
        /* $FlowFixMe required until refactored without state */
        const v: V = ''

        this.setState({
          selectedValue: v,
          values: [],
        })
        return
      }

      this.setState({
        selectedValue: props.selectedValue ? props.selectedValue : values[0].value,
        values: props.values,
      })
    } catch (e) {
      // todo remove catch
    }
  }

  render() {
    const {
      opened,
    } = this.props

    let content
    if (this.state.values.length === 0) {
      content = <RNView><RNText>{strings.noItems}</RNText></RNView>
    } else {
      content = (
        <RNView>
          {this.props.title ? (<RNText>{this.props.title}</RNText>) : null}
          <RNPicker
            selectedValue={this.state.selectedValue}
            onValueChange={value => this.setState({ selectedValue: value })}
          >
            {this.state.values.map(({ label, value }, index) => {
              return (
                <RNPicker.Item key={index} label={label} value={value}/>
              )
            })}
          </RNPicker>
          <DoneCancelRow
            onDone={() => this.props.onDone && this.props.onDone(this.state.selectedValue)}
            onCancel={this.props.onCancel}
          />
        </RNView>
      )
    }

    if (this.props.onCancel) {
      return (
        <MyDialog opened={opened} modalDidClose={this.props.onCancel}>
          {content}
        </MyDialog>
      )
    } else {
      return <MyDialog opened={opened} disableOnBackPress>{content}</MyDialog>
    }
  }
}

export {
  PickerDialog,
}
