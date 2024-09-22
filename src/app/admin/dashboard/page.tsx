'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserManagement from '@/components/UserManagement';


import styles from '../../../styles/AdminDashboard.module.css';
import ProjectManagement from '@/components/ProjectManagement ';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); 

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'projects':
         return <ProjectManagement />;
     
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
