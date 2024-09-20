// Modal.tsx
import React, { ChangeEvent } from 'react';
import styles from '../styles/Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newPageName: string;
  setNewPageName: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, newPageName, setNewPageName }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add New Page</h2>
        <input
          type="text"
          placeholder="Enter page name"
          value={newPageName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPageName(e.target.value)}
          className={styles.input}
        />
        <button onClick={onSubmit} className={styles.submitButton}>
          Add Page
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
