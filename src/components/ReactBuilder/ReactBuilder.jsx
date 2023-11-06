import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../Content/Content';
import styles from './ReactBuilder.module.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppContext } from '../../context/store';
import {
  copyForm,
  copyFormItem,
  copyInfoIcon,
  reorderCards,
  reorderElementsInCard,
  reorderElementsBetweenCards,
} from './dnd-utils';
import { safeJsonParse } from '../../utils/utils';
import {
  parsedDestinationDroppableIdTypes,
  parsedSourceDroppableIdTypes,
  droppableTypeTypes,
} from '../../constants/constants';
import { menuItems } from '../../data/menuItems';

const ReactBuilder = () => {
  const { store, setStore } = useAppContext();

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const parsedSourceDroppableId = safeJsonParse(source?.droppableId)?.droppableId;
    const parsedSourceCardId = safeJsonParse(source?.droppableId)?.cardId;

    const parsedDestinationDroppableId = safeJsonParse(destination?.droppableId)?.droppableId;
    const parsedDestinationCardId = safeJsonParse(destination?.droppableId)?.cardId;
    const parsedDestinationElementId = safeJsonParse(destination?.droppableId)?.elementId;

    const isFormCopy =
      result.type === droppableTypeTypes.MENU &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.MENU &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.CONTENT;

    const isCopyFormItem =
      result.type === droppableTypeTypes.MENU_CHILDREN &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.MENU_CHILDREN &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.CONTENT_CHILDREN;

    const isReorderContentCards =
      result.type === droppableTypeTypes.MENU && parsedSourceDroppableId === parsedDestinationDroppableId;

    const isReorderNavigatorCards =
      result.type === droppableTypeTypes.NAVIGATOR &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.NAVIGATOR_ELEMENTS &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.NAVIGATOR_ELEMENTS;

    const isReorderElementsInCard =
      result.type === droppableTypeTypes.MENU_CHILDREN &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.CONTENT_CHILDREN &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.CONTENT_CHILDREN &&
      parsedSourceCardId === parsedDestinationCardId;

    const isReorderElementsInCardNavigator =
      result.type === droppableTypeTypes.NAVIGATOR_INNER_ELEMENTS &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.NAVIGATOR_INNER_ELEMENTS &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.NAVIGATOR_INNER_ELEMENTS &&
      parsedSourceCardId === parsedDestinationCardId;

    const isReorderElementsBetweenCards =
      result.type === droppableTypeTypes.MENU_CHILDREN &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.CONTENT_CHILDREN &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.CONTENT_CHILDREN &&
      parsedSourceCardId !== parsedDestinationCardId;

    const isReorderElementsBetweenCardsNavigator =
      result.type === droppableTypeTypes.NAVIGATOR_INNER_ELEMENTS &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.NAVIGATOR_INNER_ELEMENTS &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.NAVIGATOR_INNER_ELEMENTS &&
      parsedSourceCardId !== parsedDestinationCardId;

    const isCopyInfoIcon =
      result.type === droppableTypeTypes.INFO_ICON &&
      parsedSourceDroppableId === parsedSourceDroppableIdTypes.INFO_ICON &&
      parsedDestinationDroppableId === parsedDestinationDroppableIdTypes.INFO_ICON;

    if (isFormCopy) {
      const result = copyForm(store.cards, draggableId, destination, menuItems);
      setStore({ ...store, cards: result });
    }

    if (isCopyFormItem) {
      const result = copyFormItem(store.cards, draggableId, destination, menuItems, parsedDestinationCardId);
      setStore({ ...store, cards: result });
    }

    if (isReorderContentCards || isReorderNavigatorCards) {
      const result = reorderCards(store.cards, source.index, destination.index);
      setStore({ ...store, cards: result });
    }

    if (isReorderElementsInCard || isReorderElementsInCardNavigator) {
      const result = reorderElementsInCard(store.cards, parsedSourceCardId, source.index, destination.index);
      setStore({ ...store, cards: result });
    }

    if (isReorderElementsBetweenCards || isReorderElementsBetweenCardsNavigator) {
      const result = reorderElementsBetweenCards(
        store.cards,
        parsedSourceCardId,
        parsedDestinationCardId,
        source.index,
        destination.index,
      );
      setStore({ ...store, cards: result });
    }

    if (isCopyInfoIcon) {
      const result = copyInfoIcon(
        store.cards,
        parsedSourceCardId,
        parsedDestinationCardId,
        parsedDestinationElementId,
        draggableId,
        menuItems,
      );
      setStore({ ...store, cards: result });
    }
  };

  return (
    <div className={styles.wrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Sidebar />
        <Content />
      </DragDropContext>
    </div>
  );
};

export default ReactBuilder;
