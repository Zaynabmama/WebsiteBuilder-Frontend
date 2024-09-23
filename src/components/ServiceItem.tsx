import React from 'react';


interface ServiceItemProps {
  item: {
    title: string;
    description: string;
    features: string[];
  };
  onChange: (updatedItem: { title: string; description: string; features: string[] }) => void;
  onRemove: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ item, onChange, onRemove }) => {
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...item.features];
    updatedFeatures[index] = value;
    onChange({ ...item, features: updatedFeatures });
  };

  return (
    <div >
      <input
        type="text"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        placeholder="Service Title"
      />
      <textarea
        value={item.description}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
        placeholder="Description"
      />
      {item.features.map((feature, index) => (
        <input
          key={index}
          type="text"
          value={feature}
          onChange={(e) => handleFeatureChange(index, e.target.value)}
          placeholder={`Feature ${index + 1}`}
        />
      ))}
      <button onClick={onRemove}>Remove Service</button>
    </div>
  );
};

export default ServiceItem;
