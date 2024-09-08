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
    
   
  ];
  