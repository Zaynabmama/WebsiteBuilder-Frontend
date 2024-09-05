import { FiFile, FiLayers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';  // Icons from react-icons

export default function Sidebar() {
  return (
    <div>
      <button>
        <FiChevronLeft />
      </button>

      <div>
        <div>
          <FiFile />
          <span>Pages</span>
        </div>
        <div>
          <FiLayers />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
