'use client';
import styles from '../styles/SidebarP.module.css';
import { FaUsers, FaProjectDiagram, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; 
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const router = useRouter();
  const handleLogout = () => {

    localStorage.removeItem('token');
  
    router.push('/login');
  };
  
    return (
      
        <aside className={styles.sidebar}>
          <div className={styles.logoWrapper}>
            <img src="/logo0.png" alt="Logo" className={styles.logo} />
          </div>
    
          <nav className={styles.navLinks}>
            <div
              className={`${styles.navLink} ${activeTab === 'users' ? styles.active : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <FaUsers className={styles.icon} />
              Users
            </div>
            <div
              className={`${styles.navLink} ${activeTab === 'projects' ? styles.active : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <FaProjectDiagram className={styles.icon} />
              Projects
            </div>
            
          </nav>
    
          <div className={styles.footer}>
            <div className={styles.iconLink}>
              <FaUserCircle className={styles.icon} />
              Profile
            </div>
            <div className={styles.iconLink} onClick={handleLogout}>
              <FaSignOutAlt className={styles.icon} />
              Logout
            </div>
          </div>
        </aside>
           
    );
  };
  
  export default Sidebar;
  