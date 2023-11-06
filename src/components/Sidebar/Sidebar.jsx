import styles from './Sidebar.module.css';
import Menu from './Menu/Menu';
import Nav from './Nav/Nav';
import Tabs from './Tabs/Tabs';
import { useState } from 'react';

const Sidebar = () => {
  const [isActive, setIsActive] = useState('menu');
  return (
    <div className={styles.wrapper}>
      <Tabs isActive={isActive} onSetIsActive={setIsActive} />
      {isActive === 'menu' && <Menu />}
      {isActive === 'nav' && <Nav />}
    </div>
  );
};

export default Sidebar;
