import React from 'react';
import styles from '../Element.module.css';
import { Form, Select } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomBaseSelect = ({ element, isDragging, onChange }) => {
  return (
    element.type === formTypes.baseSelect && (
      <Item className={styles.component}>
        <Select
          style={{ width: '100%', border: isDragging && '1px solid green' }}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
          value={element.content.value}
          onChange={onChange}
        />
      </Item>
    )
  );
};

export default CustomBaseSelect;
