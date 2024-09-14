export interface Component {
    type: string;
    label: string;
    defaultProperties: Record<string, any>;
  }
  
  export const availableComponents: Component[] = [
    {
      type: 'button',
      label: 'Button',
      defaultProperties: {
        text: 'Click Me',
        backgroundColor: '#007BFF',
        color: '#FFFFFF',
        fontSize: '16px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
    },
    {
      type: 'header',
      label: 'Header',
      defaultProperties: {
        text: 'Header Text',
        fontSize: '24px',
        color: '#333',
        textAlign: 'center',
        margin: '10px 0',
      },
    },
    // Add other components similarly...
  ];
  