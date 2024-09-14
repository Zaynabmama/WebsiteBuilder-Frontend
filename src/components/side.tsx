'use client';
import { FiPlus, FiTrash, FiFile, FiLayers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
// import { predefinedComponents } from './prPredefinedComponents'; 
import { predefinedComponents } from './templates'; 
import { useDrag } from 'react-dnd'; 
import styles from '../styles/BSidebar.module.css';
import { Page, ComponentItem } from '../type';
import { useProject } from '../context/ProjectContext';
import { fetchPages } from '../services/page';

// interface ComponentItemProps {
//   type: string;
//   label: string;
// }
interface DraggableComponentItemProps {
  component: ComponentItem; 
}


interface SidebarProps {
  projectId: string;
}

// const getDefaultProperties = (type: string) => {
//   const component = availableComponents.find((comp) => comp.type === type);
//   return component?.properties || {};
// };
const DraggableComponentItem = ({ component }: DraggableComponentItemProps) => {
  const [, drag] = useDrag({
    type: 'component',
    item: {
       type:component.type,
      properties:component.properties, 
     },

  });
  

  return (
    <div ref={drag as unknown as React.LegacyRef<HTMLDivElement>} className={styles.componentItem}>
      {component.label}
    </div>
  
  );
};

export default function Sidebar({ projectId }: SidebarProps) {
  const {
    pages,
    selectedPage,
    addPage,
    deletePage,
    selectPage,
    setSelectedComponent,
    setPages,
  } = useProject();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'pages' | 'components'>('pages');
  const [newPageName, setNewPageName] = useState('');
  const [showInput, setShowInput] = useState(false);

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
      console.log('Adding page with name:', newPageName);
      try {
        await addPage(projectId, newPageName);
        console.log('Page successfully added');
      } catch (error) {
        console.error('Failed to add page:', error);
      }
      setNewPageName('');
      setShowInput(false);
    } else {
      console.log('Invalid page name');
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
            {showInput ? (
              <div className={styles.addPageForm}>
                <input
                  type="text"
                  placeholder="Enter page name"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  className={styles.input}
                />
                <button onClick={handleAddPageClick} className={styles.submitButton}>
                  Add Page
                </button>
              </div>
            ) : (
              <button onClick={() => setShowInput(true)} className={styles.addButton}>
                <FiPlus /> {isOpen && 'Add Page'}
              </button>
            )}

            <ul className={styles.pageList}>
              {pages.map((page) => (
                <li key={page._id} className={styles.pageItem}>
                  <div onClick={() => handlePageClick(page)}
                   className={selectedPage?._id === page._id ? styles.selectedPage : ''}
                   >
                    {isOpen ? page.name : <FiFile className={styles.pageIcon} />}
                  </div>
                  <FiTrash className={styles.deleteIcon} onClick={() => page._id && deletePage(projectId ,page._id)} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {isOpen && <h4>Components</h4>}
            <div className={styles.componentList}>
            {/* {availableComponents.map((component) => (
                <DraggableComponentItem key={component.type} component={component} />
              ))} */}
              {Object.keys(predefinedComponents).map((key) => (

                <DraggableComponentItem
                  key={key}
                  component={{
                    type: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    properties: {},
                  }}
                 />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}