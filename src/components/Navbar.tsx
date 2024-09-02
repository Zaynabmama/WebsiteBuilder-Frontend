
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';  // Import the CSS Module


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link href="/">HOME</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="#features">FEATURES</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="#pre-built">PRE-BUILTSITES</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="#testimonials">TESTIMONIALS</Link>
        </li>
     <li>
      <Link href="#join" className={styles.joinButton}>
        JOIN
      </Link></li>
       </ul>
    </nav>
  );
};

export default Navbar;