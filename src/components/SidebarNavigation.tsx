import { FiFile, FiLayers } from 'react-icons/fi';

interface SidebarNavigationProps {
  isOpen: boolean;
  activeTab: 'pages' | 'components';
  setActiveTab: (tab: 'pages' | 'components') => void;
}

export default function SidebarNavigation({
  isOpen,
  activeTab,
  setActiveTab,
}: SidebarNavigationProps) {
  return (
    <div>
      <div onClick={() => setActiveTab('pages')}>
        <FiFile />
        {isOpen && <span>Pages</span>}
      </div>
      <div onClick={() => setActiveTab('components')}>
        <FiLayers />
        {isOpen && <span>Components</span>}
      </div>
    </div>
  );
}
