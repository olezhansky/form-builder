import { v4 as uuidv4 } from 'uuid';

const reorder = (items, sourceIndex, destinationIndex) => {
  const cloneItems = [...items];
  const [removed] = cloneItems.splice(sourceIndex, 1);
  cloneItems.splice(destinationIndex, 0, removed);

  return cloneItems;
};

const insertFn = (cloneItems, destinationIndex, data) => {
  cloneItems.splice(destinationIndex, 0, {
    ...data,
    id: uuidv4(),
  });

  return cloneItems;
};

export const copyForm = (cards, draggableId, destination, menuItems) => {
  const menuObj = menuItems.find((el) => el.id === draggableId);

  const { id, ...restMenuObj } = menuObj;

  const cardsClone = [...cards];

  return insertFn(cardsClone, destination.index, restMenuObj);
};

export const copyFormItem = (cards, draggableId, destination, menuItems, parsedDestinationCardId) => {
  const { menuIndex, menuChildrenIndex } = JSON.parse(draggableId);

  const menuObj = menuItems.find((el, index) => index === menuIndex);

  const { id, ...menuChildrenObjWithoutId } = menuObj.children[menuChildrenIndex];

  const result = cards.map((card) => {
    if (parsedDestinationCardId === card.id) {
      const cardElementsClone = card.elements ? [...card.elements] : [];
      return { ...card, elements: insertFn(cardElementsClone, destination.index, menuChildrenObjWithoutId) };
    }
    return card;
  });

  return result;
};

export const reorderCards = (cards, sourceIndex, destinationIndex) => {
  return reorder(cards, sourceIndex, destinationIndex);
};

export const reorderElementsInCard = (cards, parsedSourceCardId, sourceIndex, destinationIndex) => {
  const result = cards.map((card) => {
    if (card.id === parsedSourceCardId) {
      return {
        ...card,
        elements: reorder(card.elements, sourceIndex, destinationIndex),
      };
    }
    return card;
  });
  return result;
};

export const reorderElementsBetweenCards = (
  cards,
  parsedSourceCardId,
  parsedDestinationCardId,
  sourceIndex,
  destinationIndex,
) => {
  const dragElement = cards
    .find((el) => el.id === parsedSourceCardId)
    .elements.find((_, index) => index === sourceIndex);

  const result = cards.map((card) => {
    const getElements = (elements) => {
      const elementsClone = [...elements];
      elementsClone.splice(destinationIndex, 0, dragElement);
      return elementsClone;
    };

    if (parsedSourceCardId === card.id) {
      return {
        ...card,
        elements: card.elements.filter((_, index) => index !== sourceIndex),
      };
    }
    if (parsedDestinationCardId === card.id) {
      return {
        ...card,
        elements: card?.elements ? getElements(card.elements) : [dragElement],
      };
    }

    return card;
  });

  return result;
};

export const copyInfoIcon = (
  cards,
  parsedSourceCardId,
  parsedDestinationCardId,
  parsedDestinationElementId,
  draggableId,
  menuItems,
) => {
  const dragElement = menuItems.find((item) => item.id === draggableId);
  const result = cards.map((card) => {
    if (card.id === parsedDestinationCardId) {
      return {
        ...card,
        elements: card.elements.map((element) => {
          if (element.id === parsedDestinationElementId) {
            if (element.content?.infoIcon?.name) {
              alert('Only one icon for one form element!!!');
              return element;
            }
            return {
              ...element,
              content: {
                ...element.content,
                infoIcon: {
                  name: dragElement.content.name,
                  value: '',
                },
              },
            };
          }
          return element;
        }),
      };
    }
    return card;
  });

  return result;
};
