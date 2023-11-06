import React from 'react';
import { useAppContext } from '../../../context/store';
import Card from './Card/Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { droppableIdTypes, droppableTypeTypes } from '../../../constants/constants';

const handleClickScroll = (itemId) => {
  const element = document.querySelector(`#${CSS.escape(itemId)}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Nav = () => {
  const {
    store: { cards },
  } = useAppContext();
  return (
    <Droppable
      droppableId={JSON.stringify({ droppableId: droppableIdTypes.NAVIGATOR_ELEMENTS })}
      type={droppableTypeTypes.NAVIGATOR}
    >
      {(provided) => (
        <ul ref={provided.innerRef}>
          {cards.map((card, index) => {
            return (
              <Draggable key={card.id} draggableId={`navigator_element${card?.id}`} index={index}>
                {(providedCard, snapshotCard) => (
                  <Card
                    key={card.id}
                    providedCard={providedCard}
                    card={card}
                    isDragging={snapshotCard.isDragging}
                    onClickScroll={handleClickScroll}
                  />
                )}
              </Draggable>
            );
          })}
        </ul>
      )}
    </Droppable>
  );
};

export default Nav;
