import { useState } from 'react';
import { FiFile, FiLayers, FiChevronLeft, FiChevronRight, FiTrash } from 'react-icons/fi';  // Icons from react-icons

interface SidebarProps {
    pages: any[];
    onSelectPage: (page: any) => void;
    onDeletePage: (pageId: string) => void;
  }
export default function Sidebar({ pages, onSelectPage, onDeletePage }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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