interface Component {
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
        backgroundColor: 'blue',
        color: 'red',
        fontSize: '16px',
      },
    },
    {
        type: 'header',
        label: 'Header',
        defaultProperties: {
          text: 'Header Text',
          fontSize: '24px',
          color: '#333',
        },
      },
   
  ];
  