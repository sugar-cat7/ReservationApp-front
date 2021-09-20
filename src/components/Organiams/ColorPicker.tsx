import React from 'react';
import { CirclePicker, CirclePickerProps } from 'react-color';

const ColorPicker: React.FC<CirclePickerProps> = (props) => {
  return <CirclePicker {...props} />;
};

export default ColorPicker;
