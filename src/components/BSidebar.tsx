import { FiPlus, FiTrash, FiFile, FiLayers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import { availableComponents } from '../components/prPredefinedComponents'; 
import { useDrag } from 'react-dnd'; 
import styles from '../styles/BSidebar.module.css';

interface Page {
  _id: string;
  name: string;
  components: any[];  
}

interface SidebarProps {
  onAddPage: (name: string) => void;
  pages: Page[];
  onSelectPage: (page: Page) => void;
  onDeletePage: (pageId: string) => void;
}
const getDefaultProperties = (type: string) => {
  const component = availableComponents.find((comp) => comp.type === type);
  return component?.defaultProperties || {};
};
const ComponentItem = ({ type }: { type: string }) => {
  const [, drag] = useDrag({
    type: 'component',
    item: {
       type,
      properties: getDefaultProperties(type), 
     },

  });
  

  return (
    <div ref={drag as unknown as React.LegacyRef<HTMLDivElement>} className={styles.componentItem}>
      {type}
    </div>
  
  );
};

export default function Sidebar({ onAddPage, pages, onSelectPage, onDeletePage }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'pages' | 'components'>('pages');
  const [newPageName, setNewPageName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddPageClick = () => {
    if (newPageName.trim()) {
      onAddPage(newPageName);
      setNewPageName('');
      setShowInput(false);
    } else {
      console.log('not valid name');
    }
  };

  

  const getDefaultProperties = (type: string) => {
  switch (type) {
    case 'button':
      return {
        text: 'Click Me',
        color: 'white',
        backgroundColor: 'blue',
        fontSize: '16px',
      };
    case 'Header':
      return {
        text: 'Header Text',
        color: '#333',
        fontSize: '24px',
      };
    default:
      return {};
  }
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
                  <div onClick={() => onSelectPage(page)}>
                    {isOpen ? page.name : <FiFile className={styles.pageIcon} />}
                  </div>
                  <FiTrash className={styles.deleteIcon} onClick={() => onDeletePage(page._id)} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {isOpen && <h4>Components</h4>}
            <div className={styles.componentList}>
             
              <ComponentItem type="button" />
              <ComponentItem type="header" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}