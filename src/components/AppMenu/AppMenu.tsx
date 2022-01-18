import Link from 'next/link';
import { AppMenuProps } from './types';
import styles from './AppMenu.module.scss';
import { useState } from 'react';
import MenuElement from './MenuElement';

const AppMenu = ({ isLoggedIn }: AppMenuProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const setShowMobileMenuFunction = () => {
    setShowMobileMenu(!showMobileMenu);
    document.documentElement.classList[showMobileMenu ? 'remove' : 'add'](
      'noScroll'
    );
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.AppMenu}>
        <Link href='/'>
          <a className={styles.logo}>MenuMe</a>
        </Link>
        <button
          className={
            showMobileMenu
              ? `${styles.hamburger} ${styles.cross}`
              : `${styles.hamburger}`
          }
          type='button'
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setShowMobileMenuFunction();
          }}
        >
          <span className={styles.lines}></span>
          <span className={styles.lines}></span>
        </button>
        <MenuElement
          isLoggedIn={isLoggedIn}
          showMenu={setShowMobileMenuFunction}
          className={showMobileMenu ? 'menuShow' : 'menuHide'}
        />
      </div>
    </header>
  );
};

export default AppMenu;
