import { useRef } from 'react';

export default function Canvas({ components, setComponents }: { components: any[], setComponents: any }) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={canvasRef} style={{ minHeight: '500px', border: '2px dashed #ccc' }}>

      {components.map((component, index) => (
        <div key={index}>
      
          {component.type} 
        </div>
      ))}
    </div>
  );
}
