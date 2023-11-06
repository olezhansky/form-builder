import React from 'react';
import styles from '../Element.module.css';
import { Form, Input } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomBaseInput = ({ element, isDragging, onChange }) => {
  return (
    element.type === formTypes.baseInput && (
      <Item className={styles.component}>
        <Input
          placeholder={element.content.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={element.content.value}
          style={{ borderColor: isDragging && 'green' }}
        />
      </Item>
    )
  );
};

export default CustomBaseInput;
