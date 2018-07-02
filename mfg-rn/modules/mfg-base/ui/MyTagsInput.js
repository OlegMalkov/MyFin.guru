/* @flow */

import React from 'react'
import { TagInput } from './TagInput'
import { strings } from '../localization';

type Props = {|
  comment: string,
  tags: Array<string>,
  onChange: (tags: Array<string>) => any,
  onTextChange: (val: string) => any,
|}

const MyTagsInput = ({ comment, tags, onChange, onTextChange }: Props) => (
  <TagInput
    value={tags}
    valueText={comment}
    onChange={onChange}
    onTextChange={onTextChange}
    tagColor="blue"
    tagTextColor="white"
    inputProps={{
      keyboardType: 'default',
      placeholder: strings.youCanEnterCommentAndTagsHere,
    }}
    separators={['\n']}
    numberOfLines={2}
  />
)

export {
  MyTagsInput,
}
