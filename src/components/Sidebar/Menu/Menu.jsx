import styles from './Menu.module.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DownOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import MenuChildren from './MenuChildren/MenuChildren';
import { droppableIdTypes } from '../../../constants/constants';
import { menuItems } from '../../../data/menuItems';

const getDroppableIdAndType = (value) => {
  if (value === 'form') {
    return droppableIdTypes.MENU;
  }
  if (value === 'infoIcon') {
    return droppableIdTypes.INFO_ICON;
  }
  return '-';
};

const Menu = () => {
  const [modifiedMenuItems, setModifiedMenuItems] = useState(menuItems);
  const [droppableAndTypeState, setDroppableAndTypeState] = useState(null);

  const handleToggleVisible = useCallback(
    (menuItemId) => {
      setModifiedMenuItems(
        modifiedMenuItems?.map((item) => (item.id === menuItemId ? { ...item, isOpen: !item.isOpen } : item)),
      );
    },
    [modifiedMenuItems],
  );

  const handleMouseEnter = (menuItemKey) => {
    setDroppableAndTypeState(menuItemKey);
  };

  return (
    <div>
      <Droppable
        droppableId={JSON.stringify({ droppableId: getDroppableIdAndType(droppableAndTypeState) })}
        isDropDisabled
        type={getDroppableIdAndType(droppableAndTypeState)}
      >
        {(provided) => (
          <ul ref={provided.innerRef} className={styles.list}>
            {modifiedMenuItems.map((menuItem, menuIndex) => (
              <Draggable
                key={menuItem.id}
                draggableId={menuItem.id}
                index={menuIndex}
                isDragDisabled={menuItem.key !== 'form' && menuItem.key !== 'infoIcon'}
              >
                {(providedItem, snapshotItem) => (
                  <>
                    <li
                      className={styles.item}
                      ref={providedItem.innerRef}
                      {...providedItem.draggableProps}
                      {...providedItem.dragHandleProps}
                      style={{
                        ...providedItem.draggableProps.style,
                        transform: snapshotItem.isDragging
                          ? providedItem.draggableProps.style?.transform
                          : 'translate(0px, 0px)',
                      }}
                      onClick={() => handleToggleVisible(menuItem.id)}
                      onMouseEnter={() =>
                        menuItem.key === 'form' || menuItem.key === 'infoIcon' ? handleMouseEnter(menuItem.key) : null
                      }
                    >
                      <div className={styles.itemInner}>
                        {menuItem.children && (
                          <DownOutlined
                            style={{
                              marginRight: 5,
                              transform: menuItem.isOpen && 'scaleY(-1)',
                              transition: '0.2s transform',
                            }}
                          />
                        )}
                        {menuItem.title}
                      </div>
                    </li>
                    {snapshotItem.isDragging && <div className={styles.item}>{menuItem.title}</div>}
                    {menuItem.isOpen && <MenuChildren menuItem={menuItem} menuIndex={menuIndex} />}
                  </>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Menu;
