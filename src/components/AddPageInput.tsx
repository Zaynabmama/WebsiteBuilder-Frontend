import { useState } from 'react';

interface AddPageInputProps {
  onAddPage: (name: string) => void;
  isOpen: boolean;
}

export default function AddPageInput({ onAddPage, isOpen }: AddPageInputProps) {
  const [newPageName, setNewPageName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddPageClick = () => {
    if (newPageName.trim()) {
      onAddPage(newPageName);
      setNewPageName('');
      setShowInput(false);
    } else {
      console.log('invalid');
    }
  };

  return (
    <div>
      {showInput ? (
        <div>
          <input
            type="text"
            placeholder="Enter page name"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
          />
          <button onClick={handleAddPageClick}>Add Page</button>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)}>
          {isOpen && 'Add Page'}
        </button>
      )}
    </div>
  );
}
