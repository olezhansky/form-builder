import React from 'react';
import styles from './Tabs.module.css';
import classnames from 'classnames';

const Tabs = ({ isActive, onSetIsActive }) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={classnames(styles.item, isActive === 'menu' && styles.active)}
        onClick={() => onSetIsActive('menu')}
      >
        Menu
      </div>

      <div
        className={classnames(styles.item, isActive === 'nav' && styles.active)}
        onClick={() => onSetIsActive('nav')}
      >
        Nav
      </div>
    </div>
  );
};

export default Tabs;
