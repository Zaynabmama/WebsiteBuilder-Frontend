import { useState, useEffect } from 'react';
import styles from '../styles/CustomizationPanel.module.css';

interface ComponentItem {
  type: 'button' | 'header' | 'text' | 'img' | 'container';
  properties: {
    text?: string;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
    justifyContent?: string;
    alignItems?: string;
    padding?: string;
  };
}

interface CustomizationPanelProps {
  selectedComponent: ComponentItem | null;
  updateComponent: (updatedProperties: ComponentItem['properties']) => void;
}

export default function CustomizationPanel({ selectedComponent, updateComponent }: CustomizationPanelProps) {
  const [componentProperties, setComponentProperties] = useState<ComponentItem['properties']>({});

  useEffect(() => {
    if (selectedComponent) {
      setComponentProperties(selectedComponent.properties || {});
    }
  }, [selectedComponent]);

  const handlePropertyChange = (property: keyof ComponentItem['properties'], value: any) => {
    const updatedProperties = {
      ...componentProperties,
      [property]: value,
    };
    setComponentProperties(updatedProperties);
    updateComponent(updatedProperties);
  };

  if (!selectedComponent) return null;

  return (
    <div className={styles.customizationPanel}>
      <h3>Customize {selectedComponent.type}</h3>

      {selectedComponent.type === 'button' && (
        <div className={styles.customizationField}>
          <label>Text</label>
          <input
            type="text"
            value={componentProperties.text || ''}
            onChange={(e) => handlePropertyChange('text', e.target.value)}
          />
        </div>
      )}

      <div className={styles.customizationField}>
        <label>Color</label>
        <input
          type="color"
          value={componentProperties.color || '#000000'}
          onChange={(e) => handlePropertyChange('color', e.target.value)}
        />
      </div>

      <div className={styles.customizationField}>
        <label>Background Color</label>
        <input
          type="color"
          value={componentProperties.backgroundColor || '#ffffff'}
          onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
        />
      </div>

      <div className={styles.customizationField}>
        <label>Font Size</label>
        <input
          type="number"
          value={componentProperties.fontSize || '16'}
          onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
        />
      </div>
    </div>
  );
}
