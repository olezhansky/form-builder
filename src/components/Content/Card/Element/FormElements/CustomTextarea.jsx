import React from 'react';
import styles from '../Element.module.css';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomTextarea = ({ element, isDragging, onChange }) => {
  return (
    element.type === formTypes.textarea && (
      <Item className={styles.component}>
        <TextArea
          rows={element.content.rows}
          placeholder={element.content.placeholder}
          maxLength={element.content.maxLength}
          value={element.content.value}
          onChange={(e) => onChange(e.target.value)}
          style={{ borderColor: isDragging && 'green' }}
        />
      </Item>
    )
  );
};

export default CustomTextarea;
