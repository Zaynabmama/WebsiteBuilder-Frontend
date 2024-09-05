import { useState } from 'react';
import { FiFile, FiLayers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';  // Icons from react-icons

interface SidebarProps {
    pages: any[];
    onSelectPage: (page: any) => void;
  }
export default function Sidebar() {
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