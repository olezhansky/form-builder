import React from 'react';
import styles from '../Element.module.css';
import { Checkbox, Form } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomCheckbox = ({ element, isDragging, onChange }) => {
  return (
    element.type === formTypes.checkbox && (
      <Item className={styles.component}>
        <Checkbox
          onChange={(e) => onChange(e.target.checked)}
          checked={element.content.value}
          style={{ border: isDragging && '1px solid green' }}
        >
          Checkbox
        </Checkbox>
      </Item>
    )
  );
};

export default CustomCheckbox;
