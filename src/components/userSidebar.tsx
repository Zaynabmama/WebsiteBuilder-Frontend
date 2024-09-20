import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.logo}>
          My Websites
        </Link>
      </div>

      <div className={styles.navRight}>
        <Link href="/projects" className={styles.navLink}>
          My Projects
        </Link>
        <Link href="/deployed-websites" className={styles.navLink}>
          Deployed Websites
        </Link>

        <Link href="/profile" className={styles.iconLink}>
          <FaUserCircle />
        </Link>
        <Link href="/logout" className={styles.iconLink}>
          <FaSignOutAlt />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
