import React, { useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const SimplePopup: React.FC<PopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim() !== '') {
      onSubmit(value);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Add a New Page</h3>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter page name"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Add Page</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SimplePopup;
