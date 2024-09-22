import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {

    localStorage.removeItem('token');
  
    router.push('/login');
  };
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
        <span className={styles.iconLink} onClick={handleLogout}>
          <FaSignOutAlt />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
