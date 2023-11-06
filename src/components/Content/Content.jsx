import styles from './Content.module.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppContext } from '../../context/store';
import Card from './Card/Card';
import { droppableIdTypes, droppableTypeTypes } from '../../constants/constants';
import classNames from 'classnames';

const Content = () => {
  const {
    store: { cards },
  } = useAppContext();

  return (
    <div className={styles.wrapper}>
      <Droppable droppableId={JSON.stringify({ droppableId: droppableIdTypes.CONTENT })} type={droppableTypeTypes.MENU}>
        {(provided, snapshot) => (
          <ul
            className={classNames({
              [styles.list]: true,
              [styles.isDraggingOver]: snapshot.isDraggingOver,
              [styles.emptyList]: !cards.length,
            })}
            ref={provided.innerRef}
          >
            {cards.length === 0 && (
              <div
                className={classNames({
                  [styles.emptyListText]: true,
                  [styles.emptyListTextDraggingOver]: snapshot.isDraggingOver,
                })}
              >
                Drop FORM here
              </div>
            )}
            {cards?.map((card, cardIndex) => {
              return (
                <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
                  {(providedCard, snapshotCard) => (
                    <li
                      ref={providedCard.innerRef}
                      {...providedCard.draggableProps}
                      style={providedCard.draggableProps.style}
                      id={card.id}
                    >
                      <Card
                        cardData={card}
                        providedCard={providedCard}
                        cardIndex={cardIndex}
                        isDragging={snapshotCard.isDragging}
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Content;
