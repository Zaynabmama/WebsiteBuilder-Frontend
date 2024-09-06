import { useDrop } from 'react-dnd';

interface ComponentItem {
  type: string;
  properties?: Record<string, any>;
}

interface CanvasProps {
  components: ComponentItem[];
  setComponents: (components: ComponentItem[]) => void;
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
          {component.type === 'Button' && <button>{component.properties?.text || 'Button'}</button>}
          {component.type === 'Header' && <h1>{component.properties?.text || 'Header Text'}</h1>}
        </div>
      ))}
    </div>
  );
}
