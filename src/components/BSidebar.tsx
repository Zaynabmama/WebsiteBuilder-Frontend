'use client';
import React, { useEffect, useState } from 'react';
import { FiPlus, FiTrash, FiFile, FiLayers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDrag } from 'react-dnd';
import styles from '../styles/BSidebar.module.css';
import { Page } from '../type';
import { useProject } from '../context/ProjectContext';
import { fetchPages } from '../services/page';
import { advancedPredefinedComponents, AdvancedPredefinedComponent } from './dPredefinedComponents';
import Modal from './Modal';

interface DraggableComponentProps {
  component: AdvancedPredefinedComponent<any>; 
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ component }) => {
  const [, drag] = useDrag({
    type: 'component',
    item: {
      type: component.type,
      properties: component.properties,
    },
  });

  return (
    <div ref={drag as unknown as React.LegacyRef<HTMLDivElement>} className={styles.componentItem}>
      {component.name}
    </div>
  );
};

interface SidebarProps {
  projectId: string;
}

const Sidebar = ({ projectId }: SidebarProps) => {
  const {
    pages,
    selectedPage,
    addPage,
    deletePage,
    selectPage,
    setPages,
  } = useProject();

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'pages' | 'components'>('pages');
  const [newPageName, setNewPageName] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPages = await fetchPages(projectId);
        setPages(fetchedPages);
      } catch (error) {
        console.error('Failed to fetch pages:', error);
      }
    };

    fetchData();
  }, [projectId, setPages]);

  const handleAddPageClick = async () => {
    if (newPageName.trim()) {
      try {
        await addPage(projectId, newPageName);
        setNewPageName('');
        setIsPopupOpen(false);
      } catch (error) {
        console.error('Failed to add page:', error);
      }
    }
  };

  const handlePageClick = (page: Page) => {
    selectPage(page);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
      </button>

      <div className={styles.navSection}>
        <div className={styles.navItem} onClick={() => setActiveTab('pages')}>
          <FiFile className={styles.icon} />
          {isOpen && <span>Pages</span>}
        </div>
        <div className={styles.navItem} onClick={() => setActiveTab('components')}>
          <FiLayers className={styles.icon} />
          {isOpen && <span>Components</span>}
        </div>
      </div>

      <div className={styles.pageSection}>
        {activeTab === 'pages' ? (
          <div>
            {isOpen && <h4>Pages</h4>}
            <button onClick={() => setIsPopupOpen(true)} className={styles.addButton}>
              <FiPlus /> {isOpen && 'Add Page'}
            </button>

            <ul className={styles.pageList}>
              {pages.map((page) => (
                <li key={page._id} className={styles.pageItem}>
                  <div
                    onClick={() => handlePageClick(page)}
                    className={selectedPage?._id === page._id ? styles.selectedPage : ''}
                  >
                    {isOpen ? page.name : <FiFile className={styles.icon} />}
                  </div>
                  <FiTrash
                    className={styles.deleteIcon}
                    onClick={() => page._id && deletePage(projectId, page._id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {isOpen && <h4>Components</h4>}
            <div className={styles.componentList}>
              {Object.values(advancedPredefinedComponents).map((component) => (
                <DraggableComponent
                  key={component.type}
                  component={component}
                />
              ))}
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default Sidebar;
