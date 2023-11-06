import React from 'react';
import styles from '../Element.module.css';
import { Button, Form } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomDefaultButton = ({ element }) => {
  return (
    element?.type === formTypes.defaultButton && (
      <Item className={styles.component}>
        <Button htmlType='submit'>{element?.content?.name}</Button>
      </Item>
    )
  );
};

export default CustomDefaultButton;
