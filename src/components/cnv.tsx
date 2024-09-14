import React from 'react';
import { useDrop } from 'react-dnd';

import { predefinedComponents } from '../components/prPredefinedComponents'; 
import { availableComponents } from '../componentDefinitions'; 
import styles from '../styles/Canvas.module.css';

import { ComponentItem } from '../type';
import { useEffect } from 'react';

interface CanvasProps {
  components: ComponentItem[];
  setComponents: (updateFn: (prevComponents: ComponentItem[]) => ComponentItem[]) => void;
  selectedComponent: ComponentItem | null;
  setSelectedComponent: (component: ComponentItem | null) => void;
}




const Canvas: React.FC<CanvasProps> = ({ components, setComponents, selectedComponent, setSelectedComponent }) => {
  const [, drop] = useDrop({
    accept: 'component',
    drop: (item: { type: string; defaultProperties: Record<string, any>; label: string }) => {
      const ComponentDefinition = availableComponents.find(comp => comp.type === item.type);
      const newComponent: ComponentItem = {
        _id: undefined, 
        type: item.type,
        label: ComponentDefinition?.label || item.type,
        properties: { ...ComponentDefinition?.defaultProperties }
      };
      
      setComponents((prevComponents: ComponentItem[]) => [...prevComponents, newComponent]);
    }
  });

  const handleComponentClick = (id: string | undefined) => {
         const component = components.find(comp => comp._id === id) || null;
         setSelectedComponent(component);
       };
  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement>} className={styles.canvas}>
          {components.map((component, index) => {
        const Component = predefinedComponents[component.type];
  
        if (!Component) {
          console.error(`Component type "${component.type}" not found in predefined components.`);
          return null;
        }
  
        return (
          <div
            key={component._id || index} // Fixed spacing issue here
            onClick={() => handleComponentClick(component._id)}
          >
            <Component properties={component.properties || {}} />
          </div>
        );
      })}
    </div>
  );
  
};

export default Canvas;

