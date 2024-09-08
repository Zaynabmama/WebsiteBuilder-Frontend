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
      {
        type: 'text',
        label: 'Text Block',
        defaultProperties: {
          text: 'Enter your text here',
          fontSize: '16px',
          color: '#000',
        },
      },
      {
        type: 'image',
        label: 'Image',
        defaultProperties: {
          src: 'https://via.placeholder.com/150',
          alt: 'Placeholder Image',
          width: '150px',
          height: '150px',
        },
      },
      {
        type: 'container',
        label: 'Container',
        defaultProperties: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '20px',
        },
      },
   
  ];
  