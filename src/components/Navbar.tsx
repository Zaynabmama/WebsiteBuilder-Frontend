import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/features">Features</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/free-resources">Free Resources</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/testimonials">Testimonials</Link>
        </li>
        <li className={`${styles.navItem} ${styles.join}`}>
          <Link href="/join">Join</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
