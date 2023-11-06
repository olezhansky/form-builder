import styles from './Element.module.css';
import { DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { useAppContext } from '../../../../context/store';
import { Droppable } from 'react-beautiful-dnd';
import InfoIcon from './InfoIcon/InfoIcon';
import { droppableIdTypes, droppableTypeTypes } from '../../../../constants/constants';
import {
  CustomBaseInput,
  CustomBaseSelect,
  CustomCheckbox,
  CustomColorPicker,
  CustomDashedButton,
  CustomDefaultButton,
  CustomMultiSelect,
  CustomNumberInput,
  CustomPrimaryButton,
  CustomTextarea,
} from './FormElements';

const Element = ({ element, cardId, providedElement, isDragging }) => {
  const { updateCard } = useAppContext();

  const handleRemove = () => {
    updateCard(cardId, element, 'ACTION_REMOVE');
  };

  const onChange = (value) => {
    updateCard(cardId, element, 'ACTION_CHANGE', (el) => ({
      ...el,
      content: {
        ...el.content,
        value: value,
      },
    }));
  };

  const onChangeColorPicker = (color) => {
    updateCard(cardId, element, 'ACTION_CHANGE', (el) => ({
      ...el,
      content: {
        ...el.content,
        value: color.toHexString(),
      },
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div {...providedElement.dragHandleProps} className={styles.dragIcon}>
        <DragOutlined style={{ color: isDragging && 'green' }} />
      </div>
      <div className={styles.main}>
        <Droppable
          droppableId={JSON.stringify({
            droppableId: droppableIdTypes.INFO_ICON,
            cardId: cardId,
            elementId: element.id,
          })}
          type={droppableTypeTypes.INFO_ICON}
        >
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className={styles.fields}>
              <CustomBaseInput element={element} isDragging={isDragging} onChange={onChange} />
              <CustomNumberInput element={element} isDragging={isDragging} onChange={onChange} />
              <CustomTextarea element={element} isDragging={isDragging} onChange={onChange} />
              <CustomBaseSelect element={element} isDragging={isDragging} onChange={onChange} />
              <CustomMultiSelect element={element} isDragging={isDragging} onChange={onChange} />
              <CustomCheckbox element={element} isDragging={isDragging} onChange={onChange} />
              <CustomColorPicker element={element} isDragging={isDragging} onChange={onChangeColorPicker} />
              <InfoIcon element={element} cardId={cardId} snapshot={snapshot} isDragging={isDragging} />
            </div>
          )}
        </Droppable>
        <CustomPrimaryButton element={element} />
        <CustomDefaultButton element={element} />
        <CustomDashedButton element={element} />
      </div>
      <DeleteOutlined
        style={{
          fontSize: 20,
          marginLeft: 10,
          cursor: 'pointer',
          opacity: isDragging && 0,
          visibility: isDragging && 'hidden',
        }}
        onClick={handleRemove}
      />
    </div>
  );
};

export default Element;
