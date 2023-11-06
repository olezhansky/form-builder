import React from 'react';
import styles from '../Element.module.css';
import { Form, InputNumber } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomNumberInput = ({ element, isDragging, onChange }) => {
  return (
    element.type === formTypes.numberInput && (
      <Item className={styles.component}>
        <InputNumber
          min={element.content.min}
          max={element.content.max}
          defaultValue={element.content.defaultValue}
          value={element.content.value}
          onChange={onChange}
          style={{ borderColor: isDragging && 'green' }}
        />
      </Item>
    )
  );
};

export default CustomNumberInput;
