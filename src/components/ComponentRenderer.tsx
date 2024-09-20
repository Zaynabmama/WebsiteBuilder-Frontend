
export default function ComponentRenderer({ component }: { component: any }) {
    switch (component.type) {
      case 'text':
        return <p style={{ color: component.properties.color }}>{component.properties.text}</p>;
      case 'button':
        return <button style={{ backgroundColor: component.properties.backgroundColor }}>{component.properties.text}</button>;
      case 'image':
        return <img src={component.properties.src} alt={component.properties.alt} />;
      default:
        return null;
    }
  }
  