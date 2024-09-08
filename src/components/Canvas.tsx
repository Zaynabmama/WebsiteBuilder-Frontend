import { useDrop } from 'react-dnd';
import { availableComponents } from '../components/prPredefinedComponents'; 
interface ComponentItem {
  type: string;
  properties?: Record<string, any>;
}

interface CanvasProps {
  components: ComponentItem[];
  setComponents: (components: ComponentItem[]) => void;
  setSelectedComponent: (component: ComponentItem | null) => void;
}

export default function Canvas({ components, setComponents }: CanvasProps) {
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

  return (
    <div ref={drop as unknown as React.LegacyRef<HTMLDivElement>} style={{ border: '1px dashed black', padding: '20px', minHeight: '470px' }}>
      {components.map((component, index) => (
        <div key={index}>
          {component.type === 'button' && (
            <button style={component.properties}>{component.properties?.text || 'Button'}</button>
          )}
          {component.type === 'header' && (
            <h1 style={component.properties}>{component.properties?.text || 'Header Text'}</h1>
          )}
          {component.type === 'text' && (
            <p style={component.properties}>{component.properties?.text || 'Text Block'}</p>
          )}
          {component.type === 'img' && (
            <img
              src={component.properties?.src || 'https://via.placeholder.com/150'}
              alt={component.properties?.alt || 'Image'}
              style={{
                width: component.properties?.width || '150px',
                height: component.properties?.height || '150px',
              }}
            />
          )}
          {component.type === 'container' && (
            <div style={component.properties}>
              {/* Optionally allow nested components */}
              Container
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
