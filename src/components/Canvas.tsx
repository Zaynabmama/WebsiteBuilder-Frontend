'use client';
import React, { Component, RefObject } from 'react';
import { useDrop } from 'react-dnd';
import { predefinedComponents } from '../components/templates';
import styles from '../styles/Canvas.module.css';
import { ComponentItem } from '../type'; 

interface CanvasProps {
  components: ComponentItem[];
  setComponents: (updateFn: (prevComponents: ComponentItem[]) => ComponentItem[]) => void;
  selectedComponent: ComponentItem | null;
  setSelectedComponent: (component: ComponentItem | null) => void;
  handleComponentClick: (id: string | undefined) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  setComponents,
  selectedComponent,
  setSelectedComponent,
  handleComponentClick
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: (item: ComponentItem) => {
      console.log('Dropped item:', item); 

      if (!item.type) {
        console.error('Dropped item is missing type:', item);
        return;
      }

      if (!item.properties) {
        console.warn('Dropped item has no properties:', item);
      } else if (Object.keys(item.properties).length === 0) {
        console.warn('Dropped item has empty properties:', item);
      }

      setComponents((prevComponents) => {
       
        const newComponent: ComponentItem = {
          _id: undefined,
          type: item.type,
          properties: item.properties,
        };
  
        console.log('New component being added:', newComponent); 

        return [...prevComponents, newComponent];
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as unknown as RefObject<HTMLDivElement>}
      className={`${styles.canvas} ${isOver ? styles.over : ''}`}
    >
      {components.map((component, index) => {
        const Component = predefinedComponents[component.type];

        if (!Component) {
          console.error(`Component type "${component.type}" not found.`);
          return null;
        }

        console.log('Rendering component:', component);

        return (
          <div
            key={component._id || index} 
            onClick={() => handleComponentClick(component._id)}
            className={styles.component}
          >
            <Component properties={component.properties || {}} />
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;
