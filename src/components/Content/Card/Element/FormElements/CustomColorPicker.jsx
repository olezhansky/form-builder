import React from 'react';
import styles from '../Element.module.css';
import { Form, ColorPicker } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomColorPicker = ({ element, isDragging, onChange }) => {
  return (
    element.type === formTypes.colorPicker && (
      <Item className={styles.component}>
        <ColorPicker
          style={{ border: isDragging && '1px solid green', width: '100%' }}
          onChange={onChange}
          showText={(color) => <span>({color.toHexString()})</span>}
        />
      </Item>
    )
  );
};

export default CustomColorPicker;
