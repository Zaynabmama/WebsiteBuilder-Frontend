import { useState } from 'react';
import { FiFile, FiLayers, FiChevronLeft, FiChevronRight, FiTrash, FiPlus } from 'react-icons/fi';  // Icons from react-icons

interface SidebarProps {
    onAddPage: (name: string) => void;
    pages: any[];
    onSelectPage: (page: any) => void;
    onDeletePage: (pageId: string) => void;
  }
export default function Sidebar({ pages, onSelectPage,onAddPage, onDeletePage }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
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
      console.log('cant add')
    }
  };
  return (
    <div className={isOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <button onClick={toggleSidebar}>
      {isOpen ?<FiChevronLeft />: <FiChevronRight />}
      </button>

      <div>
        <div>
          <FiFile />
          {isOpen && <span>Pages</span>}
        </div>
        {showInput ? (
          <div>
            <input
              type="text"
              placeholder="Enter page name"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
            />
            <button onClick={handleAddPageClick}>
              Add Page
            </button>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)}>
            <FiPlus /> {isOpen && 'Add Page'}
          </button>
        )}
        <ul>
          {pages.map((page) => (
            <li key={page._id} onClick={() => onSelectPage(page)}>
              {isOpen ? page.name : <FiFile />}
              <FiTrash onClick={() => onDeletePage(page._id)} />
            </li>
          ))}
        </ul>
        <div>
          <FiLayers />
          {isOpen && <span>Components</span>}
        </div>
      </div>
    </div>
  );
}