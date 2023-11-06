import React from 'react';
import styles from '../Element.module.css';
import { Button, Form } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomPrimaryButton = ({ element }) => {
  return (
    element?.type === formTypes.primaryButton && (
      <Item className={styles.component}>
        <Button type='primary' htmlType='submit'>
          {element?.content?.name}
        </Button>
      </Item>
    )
  );
};

export default CustomPrimaryButton;
