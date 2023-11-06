import React from 'react';
import styles from '../Element.module.css';
import { Form, Select } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const CustomMultiSelect = ({ element, isDragging, onChange }) => {
  return (
    element.type === formTypes.multiSelect && (
      <Item className={styles.component}>
        <Select
          mode='multiple'
          allowClear
          style={{ width: '100%', border: isDragging && '1px solid green' }}
          placeholder='Please select'
          defaultValue={[]}
          options={options}
          value={element.content.value}
          onChange={onChange}
        />
      </Item>
    )
  );
};

export default CustomMultiSelect;
