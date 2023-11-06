import React from 'react';
import styles from '../Element.module.css';
import { Button, Form } from 'antd';
import { formTypes } from '../../../../../constants/constants';

const { Item } = Form;

const CustomDashedButton = ({ element }) => {
  return (
    element?.type === formTypes.dashedButton && (
      <Item className={styles.component}>
        <Button type='dashed' htmlType='submit'>
          {element?.content?.name}
        </Button>
      </Item>
    )
  );
};

export default CustomDashedButton;
