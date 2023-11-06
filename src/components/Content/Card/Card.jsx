import React, { useState } from 'react';
import styles from './Card.module.css';
import { useAppContext } from '../../../context/store';
import { DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Divider, Form } from 'antd';
import Element from './Element/Element';
import Modal from './Modal/Modal';
import { droppableIdTypes, droppableTypeTypes, formTypes } from '../../../constants/constants';
import classnames from 'classnames';

const Card = ({ cardData, providedCard, cardIndex, isDragging }) => {
  const { store, setStore } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const handleRemove = () => {
    const result = store.cards.filter((card) => card.id !== cardData.id);
    setStore({ ...store, cards: result });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getElementIndexByType = (elementType, elementId) => {
    return cardData.elements.filter((el) => el.type === elementType).findIndex((item) => item.id === elementId) + 1;
  };

  const filteredCardDataElements = cardData.elements?.filter(
    (el) => ![formTypes.primaryButton, formTypes.defaultButton, formTypes.dashedButton].includes(el.type),
  );

  const onFinish = () => {
    const colorPickerElement = filteredCardDataElements.find((elem) => elem.type === formTypes.colorPicker);
    const resultValues = filteredCardDataElements.map((elem) => {
      const elementContentValue = Array.isArray(elem.content.value) ? elem.content.value.join(' ') : elem.content.value;
      if (elem.type === formTypes.checkbox) {
        return {
          id: elem.id,
          name: elem.content.name,
          value: elementContentValue ? 'Checked' : 'Unchecked',
          elementIndex: getElementIndexByType(elem.type, elem.id),
          infoIconValue: elem.content?.infoIcon?.value || '',
        };
      }
      if (elem.type === formTypes.colorPicker) {
        return {
          id: elem.id,
          name: elem.content.name,
          value: elementContentValue,
          colorValue: elementContentValue,
          elementIndex: getElementIndexByType(elem.type, elem.id),
          infoIconValue: elem.content?.infoIcon?.value || '',
        };
      }
      return {
        id: elem.id,
        name: elem.content.name,
        value: elementContentValue,
        elementIndex: getElementIndexByType(elem.type, elem.id),
        infoIconValue: elem.content?.infoIcon?.value || '',
        colorValue: colorPickerElement?.content?.value,
      };
    });
    setModalData(resultValues);
    showModal();
  };

  return (
    <>
      <Droppable
        droppableId={JSON.stringify({ droppableId: droppableIdTypes.CONTENT_CHILDREN, cardId: cardData.id })}
        type={droppableTypeTypes.MENU_CHILDREN}
      >
        {(provided, snapshot) => (
          <>
            <div
              className={classnames({
                [styles.card]: true,
                [styles.isDraggingOver]: snapshot.isDraggingOver,
                [styles.isDragging]: isDragging,
              })}
            >
              <div className={styles.cardTop}>
                <div {...providedCard.dragHandleProps}>
                  <DragOutlined style={{ fontSize: 20 }} />
                </div>
                <h1>
                  {cardData.title}
                  {cardIndex + 1}
                </h1>
                <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleRemove} />
              </div>
              <Divider />
              <Form onFinish={onFinish}>
                <ul
                  className={classnames({
                    [styles.list]: true,
                    [styles.emptyList]: !cardData.elements || !cardData.elements.length,
                  })}
                  ref={provided.innerRef}
                >
                  {(!cardData.elements || cardData.elements.length === 0) && (
                    <div
                      className={classnames({
                        [styles.emptyCardText]: true,
                        [styles.emptyListTextDraggingOver]: snapshot.isDraggingOver,
                      })}
                    >
                      Drop form item here
                    </div>
                  )}
                  {cardData.elements?.map((element, elementIndex) => {
                    return (
                      <Draggable key={element.id} draggableId={element.id} index={elementIndex}>
                        {(providedElement, snapshotElement) => (
                          <li
                            ref={providedElement.innerRef}
                            {...providedElement.draggableProps}
                            style={providedElement.draggableProps.style}
                            id={element.id}
                            className={styles.item}
                          >
                            <Element
                              element={element}
                              cardId={cardData.id}
                              providedElement={providedElement}
                              isDragging={snapshotElement.isDragging}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                </ul>
              </Form>
            </div>
          </>
        )}
      </Droppable>
      <Modal
        modalData={modalData}
        cardIndex={cardIndex}
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};
export default Card;
