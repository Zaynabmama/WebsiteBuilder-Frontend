import { useState } from 'react';
import {FiChevronLeft, FiChevronRight, FiTrash, FiPlus } from 'react-icons/fi';  // Icons from react-icons
import SidebarNavigation from './SidebarNavigation';
import AddPageInput from './AddPageInput';
interface SidebarProps {
    onAddPage: (name: string) => void;
    pages: any[];
    onSelectPage: (page: any) => void;
    onDeletePage: (pageId: string) => void;
  }
export default function Sidebar({ pages, onSelectPage,onAddPage, onDeletePage }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<'pages' | 'components'>('pages');
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div >
      <button onClick={toggleSidebar}>
      {isOpen ?<FiChevronLeft />: <FiChevronRight />}
      </button>

<SidebarNavigation isOpen={isOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
  

  {activeTab === 'pages' ? (
    <div>
      <h4>Pages</h4>
      <AddPageInput onAddPage={onAddPage} isOpen={isOpen} />

      <ul>
        {pages.map(page => (
          <li key={page._id}>
            <div onClick={() => onSelectPage(page)}>
              {isOpen ? page.name : null}
            </div>
            <FiTrash onClick={() => onDeletePage(page._id)} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>{isOpen && <h4>Components</h4>}</div>
  )}
</div>
);
}