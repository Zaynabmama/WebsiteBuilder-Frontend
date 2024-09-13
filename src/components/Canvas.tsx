import { useDrop } from 'react-dnd';
import { availableComponents } from '../components/prPredefinedComponents'; 
import styles from '../styles/Canvas.module.css'
import { ComponentItem } from '../type';
import { useEffect } from 'react';

interface CanvasProps {
  components: ComponentItem[];
  setComponents: (components: ComponentItem[]) => void;
  selectedComponent: ComponentItem | null; 
  setSelectedComponent: (component: ComponentItem | null) => void;
}

export default function Canvas({ components, setComponents,setSelectedComponent,selectedComponent }: CanvasProps) {


  const [, drop] = useDrop({
    accept: 'component',
    drop: (item: ComponentItem) => {
      console.log('Dropped item:', item); 
        if (item && item.type) {
          const newComponent = { ...item, _id: undefined };
          setComponents([...components, newComponent]);
          console.log('Dropped Component:', newComponent);
        } else {
          console.error('Invalid item dropped');
        }
      
    },
  });
   const handleComponentClick = (id: string | undefined) => {
    const component = components.find(comp => comp._id === id) || null;
     setSelectedComponent(component);  
   };
 
  
  
  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement> }
     className={styles.canvas}>
       {components.map((component, index) => (
        <div 
        key={component._id ||  `component-${index}`}
        onClick={() => handleComponentClick(component._id)}  
        style={{ ...component.properties }}
        >
         {renderComponent(component)}
            </div>
      ))}
    </div>
  );
}

const renderComponent = (component: ComponentItem) => {
  switch (component.type) {
    case 'button':
      return <button>{component.properties?.text || 'Button'}</button>;
    case 'header':
      return <h1 style={component.properties}>{component.properties?.text || 'Header Text'}</h1>;
    case 'text':
      return <p style={component.properties}>{component.properties?.text || 'Text Block'}</p>;
    case 'img':
      return (
        <img
          src={component.properties?.src || 'https://via.placeholder.com/150'}
          alt={component.properties?.alt || 'Image'}
          style={{
            width: component.properties?.width || '150px',
            height: component.properties?.height || '150px',
          }}
        />
      );
    case 'container':
      return <div style={component.properties}>Container</div>;
    default:
      return null;
  }
};
