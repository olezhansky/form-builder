import React from 'react';
import styles from './Card.module.css';
import Elements from './Elements/Elements';

const Card = ({ card, providedCard, isDragging, onClickScroll }) => {
  return (
    <li
      ref={providedCard.innerRef}
      {...providedCard.draggableProps}
      {...providedCard.dragHandleProps}
      style={{
        ...providedCard.draggableProps.style,
        borderBottom: isDragging && '1px solid red',
        minHeight: 50,
      }}
      key={card.id}
      className={styles.element}
      onClick={() => onClickScroll(card.id)}
    >
      {card.title}
      {card.elements && <Elements card={card} />}
    </li>
  );
};

export default Card;
