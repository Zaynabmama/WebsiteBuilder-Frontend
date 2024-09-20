import React from 'react';
import { useDrop } from 'react-dnd';
import { ComponentItem } from '../type';
import styles from '../styles/Grid.module.css';

interface GridProps {
  components: ComponentItem[];
  setComponents: (components: ComponentItem[]) => void;
}

const Grid = ({ components, setComponents }: GridProps) => {
  const [, drop] = useDrop({
    accept: 'component',
    drop: (item: ComponentItem) => {
      const newComponent = { ...item, _id: undefined };
      setComponents([...components, newComponent]);
    },
  });

  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement>} className={styles.grid}>
      {components.map((component, index) => (
        <div key={component._id || index} style={{ ...component.properties }}>

        </div>
      ))}
    </div>
  );
};

export default Grid;
