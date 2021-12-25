import Link from 'next/link';
import logout from './logout';
import styles from './MenuElement.module.scss';
import { MenuElementProps } from './types';

const MenuElement = ({ isLoggedIn, showMenu, className }: MenuElementProps) => {
  return (
    <menu
      className={
        className === 'menuShow'
          ? `${styles.menuWrapper} ${styles.menuShow}`
          : `${styles.menuWrapper} ${styles.menuHide}`
      }
    >
      <li>
        <div className={styles.top}>
          <Link href='/'>
            <a className={styles.logo}>MenuMe</a>
          </Link>
          <button
            className={`${styles.hamburger} ${styles.cross}`}
            type='button'
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              showMenu();
            }}
          >
            <span className={styles.lines}></span>
            <span className={styles.lines}></span>
          </button>
        </div>
      </li>
      {isLoggedIn ? (
        <>
          <li>
            <Link href='/groceries'>
              <a
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  showMenu();
                }}
              >
                Grocery list
              </a>
            </Link>
          </li>
          <li>
            <Link href='/recipes'>
              <a
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  showMenu();
                }}
              >
                Your recipes
              </a>
            </Link>
          </li>
          <li>
            <button
              type='button'
              onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                logout();
                showMenu();
              }}
            >
              Log out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href='/about'>
              <a
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  showMenu();
                }}
              >
                About
              </a>
            </Link>
          </li>
          <li>
            <Link href='/register'>
              <a
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  showMenu();
                }}
              >
                Register
              </a>
            </Link>
          </li>
        </>
      )}
    </menu>
  );
};

export default MenuElement;
