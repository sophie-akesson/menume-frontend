import styles from './Layout.module.scss';
import Head from 'next/head';
import { LayoutProps } from './types';
import AppMenu from '@components/AppMenu';

const Layout = ({ children, isLoggedIn }: LayoutProps) => (
  <>
    <Head>
      <title>MenuMe - Your menu for the week</title>
      <meta
        name='description'
        content='Fill in your favourite recipes and get your weekly menu.'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <AppMenu isLoggedIn={isLoggedIn} />
    <main className={styles.main}>{children}</main>
  </>
);

export default Layout;
