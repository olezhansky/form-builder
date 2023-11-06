import styles from './Elements.module.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { droppableIdTypes, droppableTypeTypes } from '../../../../../constants/constants';

const Elements = ({ card }) => {
  const { elements, id: cardId } = card;
  return (
    <Droppable
      droppableId={JSON.stringify({ droppableId: droppableIdTypes.NAVIGATOR_INNER_ELEMENTS, cardId })}
      type={droppableTypeTypes.NAVIGATOR_INNER_ELEMENTS}
    >
      {(provided) => (
        <ul ref={provided.innerRef} className={styles.wrapper} style={{ height: elements.length * 40 }}>
          {elements.map((el, index) => {
            return (
              <Draggable key={el.id} draggableId={`navigator_inner_element_${cardId}_${el?.id}`} index={index}>
                {(providedElement) => {
                  return (
                    <li
                      className={styles.element}
                      ref={providedElement.innerRef}
                      {...providedElement.draggableProps}
                      {...providedElement.dragHandleProps}
                      style={{
                        ...providedElement.draggableProps.style,
                      }}
                    >
                      {el.title}
                    </li>
                  );
                }}
              </Draggable>
            );
          })}
        </ul>
      )}
    </Droppable>
  );
};

export default Elements;
