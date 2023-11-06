import React from 'react';
import styles from './MenuChildren.module.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { droppableIdTypes, droppableTypeTypes } from '../../../../constants/constants';

const MenuChildren = ({ menuItem, menuIndex }) => {
  return (
    <Droppable
      droppableId={JSON.stringify({ droppableId: droppableIdTypes.MENU_CHILDREN })}
      isDropDisabled
      type={droppableTypeTypes.MENU_CHILDREN}
    >
      {(provided) => (
        <ul className={styles.list} ref={provided.innerRef}>
          {menuItem.children?.map((menuItemChildren, menuChildrenIndex) => {
            return (
              <Draggable
                key={menuItemChildren.id}
                draggableId={JSON.stringify({
                  id: menuItemChildren.id,
                  menuIndex,
                  menuChildrenIndex,
                })}
                index={menuChildrenIndex}
              >
                {(providedItem, snapshotItem) => (
                  <>
                    <li
                      className={classNames(!snapshotItem.isDragging && styles.item)}
                      ref={providedItem.innerRef}
                      {...providedItem.draggableProps}
                      {...providedItem.dragHandleProps}
                      style={{
                        ...providedItem.draggableProps.style,
                        transform: snapshotItem.isDragging
                          ? providedItem.draggableProps.style?.transform
                          : 'translate(0px, 0px)',
                      }}
                    >
                      {snapshotItem.isDragging ? menuItemChildren.content.component : menuItemChildren.title}
                    </li>
                    {snapshotItem.isDragging && <li className={styles.item}>{menuItemChildren.title}</li>}
                  </>
                )}
              </Draggable>
            );
          })}
        </ul>
      )}
    </Droppable>
  );
};

export default MenuChildren;
