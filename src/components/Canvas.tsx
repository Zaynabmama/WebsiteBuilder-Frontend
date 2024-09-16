import React, { RefObject } from 'react';
import { useDrop } from 'react-dnd';
import styles from '../styles/Canvas.module.css';
import { ComponentItem } from '../type';
import { advancedPredefinedComponents, AdvancedPredefinedComponentType } from './dPredefinedComponents';

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
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: (item: ComponentItem) => {
      if (!item.type) {
        console.error('Dropped item is missing type:', item);
        return;
      }

      const newComponent: ComponentItem = {
        type: item.type,
        properties: item.properties ||{},
        _id: undefined,
      };

      setComponents((prevComponents) => [...prevComponents, newComponent]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop as unknown as RefObject<HTMLDivElement>} className={styles.canvas}>
      {components.length === 0 ? (
        <p>No components to display</p>
      ) : (
      components.map((component, index) => {
        const componentType = component.type as AdvancedPredefinedComponentType;
        const ComponentToRender = advancedPredefinedComponents[componentType]?.Component;

        if (!ComponentToRender) {
          return <div key={index}>Unknown component type: {component.type}</div>;
        }

        return (
          <div
            key={component._id || index}
                        onClick={() => setSelectedComponent(component)}
          >
            <ComponentToRender properties={component.properties}/>
          </div>
        );
      })
      )}
    </div>
  );
};

export default Canvas;
