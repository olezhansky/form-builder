import React from 'react';
import { Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppContext } from '../../../../../context/store';
import styles from './InfoIcon.module.css';

const InfoIcon = ({ element, cardId, snapshot, isDragging }) => {
  const { updateCard } = useAppContext();
  const onChangeInfoIcon = (value) => {
    updateCard(cardId, element, 'ACTION_CHANGE', (el) => ({
      ...el,
      content: {
        ...el.content,
        infoIcon: {
          ...el.content.infoIcon,
          value: value,
        },
      },
    }));
  };

  const handleRemoveInfoIcon = () => {
    updateCard(cardId, element, 'ACTION_CHANGE', (el) => ({
      ...el,
      content: {
        ...el.content,
        infoIcon: null,
      },
    }));
  };

  return (
    (element.content?.infoIcon?.name || snapshot.isDraggingOver) && (
      <div className={styles.wrapper}>
        <div className={styles.verticalLineLeft} />
        <div className={styles.verticalLineRight} />
        <div className={styles.inputField}>
          <Input
            placeholder='Info icon'
            value={element.content.infoIcon?.value}
            onChange={(e) => onChangeInfoIcon(e.target.value)}
            style={{ borderColor: isDragging && 'green' }}
          />
        </div>
        <div className={styles.deleteIcon}>
          <DeleteOutlined onClick={handleRemoveInfoIcon} />
        </div>
      </div>
    )
  );
};

export default InfoIcon;
