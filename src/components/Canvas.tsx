import { useDrop } from 'react-dnd';
import { availableComponents } from '../components/prPredefinedComponents'; 
import { ComponentItem } from '../app/type'; 
import styles from '../styles/Canvas.module.css'


interface CanvasProps {
  components: ComponentItem[];
  setComponents: (components: ComponentItem[]) => void;
  selectedComponent: ComponentItem | null; 
  setSelectedComponent: (component: ComponentItem | null) => void;
}

export default function Canvas({ components, setComponents,setSelectedComponent }: CanvasProps) {
  const [, drop] = useDrop({
    accept: 'component',
    drop: (item: ComponentItem) => {
        if (item && item.type) {
          const newComponent = { ...item, _id: undefined };
          setComponents([...components, newComponent]);
          console.log('Dropped Component:', newComponent);
        } else {
          console.error('Invalid item dropped');
        }
      
    },
  });
  const handleComponentClick = (index: number) => {
    setSelectedComponent(components[index]);  
  };
  {components.map((component) => (
    <div
      key={component._id} 
      onClick={() => handleComponentClick(component)}
      style={{ ...component.properties }}
    >
      {renderComponent(component)}
    </div>
  ))}
  
  return (
    <div ref={drop as React.RefObject<HTMLDivElement>}
     className={styles.canvas}>
      {components.map((component) => (
        <div 
        key={component._id}
        onClick={() => handleComponentClick(component)}  
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
