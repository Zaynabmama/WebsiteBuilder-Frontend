import { useState, useEffect } from 'react';
import styles from '../styles/CustomizationPanel.module.css';

interface ComponentItem {
  type: string; 
  properties: Record<string, any>;
}

interface PropertyConfig {
  label: string;
  type: 'text' | 'color' | 'number' | 'select' | 'textarea';
  options?: string[];
  defaultValue?: any;
}

interface CustomizationPanelProps {
  selectedComponent: ComponentItem | null;
  updateComponent: (updatedProperties: ComponentItem['properties']) => void;
}

const propertyConfigs: Record<string, Record<string, PropertyConfig>> = {
  button: {
    text: { label: 'Text', type: 'text', defaultValue: '' },
    color: { label: 'Color', type: 'color', defaultValue: '#000000' },
    backgroundColor: { label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    fontSize: { label: 'Font Size', type: 'number', defaultValue: '16' },
  },
  navbar: {
    backgroundColor: { label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    color: { label: 'Color', type: 'color', defaultValue: '#000000' },
    logo: { label: 'Logo', type: 'text', defaultValue: '' },
    flexDirection: { label: 'Flex Direction', type: 'select', options: ['row', 'column'], defaultValue: 'row' },
    justifyContent: { label: 'Justify Content', type: 'select', options: ['flex-start', 'center', 'flex-end'], defaultValue: 'center' },
    alignItems: { label: 'Align Items', type: 'select', options: ['flex-start', 'center', 'flex-end'], defaultValue: 'center' },
  },
  teamSection: {
    title: { label: 'Title', type: 'text', defaultValue: 'Meet Our Team' },
   
   
  },
  heroSection: {
    backgroundColor: { label: 'Background Color', type: 'color', defaultValue: '#4A90E2' },
    color: { label: 'Text Color', type: 'color', defaultValue: '#FFFFFF' },
    title: { label: 'Title', type: 'text', defaultValue: 'Welcome!' },
    testimonials: { label: 'Testimonials', type: 'textarea', defaultValue: '' },
    buttonText: { label: 'Button Text', type: 'text', defaultValue: 'Learn More' },
  },
  testimonial: {
    backgroundColor: { label: 'Background Color', type: 'color', defaultValue: '#f3f4f6' },
    color: { label: 'Text Color', type: 'color', defaultValue: '#333' },
    title: { label: 'Title', type: 'text', defaultValue: 'What Our Clients Say' },
    flexDirection: { label: 'Flex Direction', type: 'select', options: ['row', 'column'], defaultValue: 'column' },
    justifyContent: { label: 'Justify Content', type: 'select', options: ['flex-start', 'center', 'flex-end'], defaultValue: 'flex-start' },
    alignItems: { label: 'Align Items', type: 'select', options: ['flex-start', 'center', 'flex-end'], defaultValue: 'center' },
  },
  
  service: {
    backgroundColor: { label: 'Background Color', type: 'color', defaultValue: '#f9f9f9' },
   
     
    flexDirection: { label: 'Flex Direction', type: 'select', options: ['row', 'column'], defaultValue: 'row' },
    
    alignItems: { label: 'Align Items', type: 'select', options: ['flex-start', 'center', 'flex-end'], defaultValue: 'flex-start' },
  },
  pricingCards: {
    title: { label: 'Title', type: 'text', defaultValue: 'Pricing Plans' },
    color: { label: 'Color', type: 'color', defaultValue: '#000000' },
    backgroundColor: { label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
    cards: { label: 'Cards ', type: 'textarea', defaultValue: '[]' },
  },
  blogSection: {
    posts: { label: 'label', type: 'textarea', defaultValue: '[]' },
  },
  
};

export default function CustomizationPanel({ selectedComponent, updateComponent }: CustomizationPanelProps) {
  const [componentProperties, setComponentProperties] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedComponent) {
      setComponentProperties(selectedComponent.properties || {});
    }
  }, [selectedComponent]);

  const handlePropertyChange = (property: string, value: any) => {
   
    const updatedProperties = {
      ...componentProperties,
      [property]: value,
    };
    setComponentProperties(updatedProperties);
    updateComponent(updatedProperties);
  };
  

  const handleServiceChange = (index: number, field: string, value: any) => {
    const updatedServices = [...(componentProperties.services || [])];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };
    handlePropertyChange('services', updatedServices);
  };
  const handleTestimonialChange = (index: number, field: string, value: any) => {
    const updatedTestimonials = [...(componentProperties.testimonials || [])];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value,
    };
    handlePropertyChange('testimonials', updatedTestimonials);
  };
  const handleCardChange = (index: number, field: string, value: any) => {
    const updatedCards = [...(componentProperties.cards || [])];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    handlePropertyChange('cards', updatedCards);
  };
  const handleMemberChange = (index: number, field: string, value: any) => {
    const updatedMembers = [...(componentProperties.members || [])];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value,
    };
    handlePropertyChange('members', updatedMembers);
  };

  const handleAddMember = () => {
    const newMember = { name: '', position: '', description: '', photoUrl: '' };
    const updatedMembers = [...(componentProperties.members || []), newMember];
    handlePropertyChange('members', updatedMembers);
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...(componentProperties.members || [])];
    updatedMembers.splice(index, 1);
    handlePropertyChange('members', updatedMembers);
  };


  if (!selectedComponent) return null;

  const config = propertyConfigs[selectedComponent.type] || {};
  
  return (
    <div className={styles.customizationPanel}>
      <h3>Customize {selectedComponent.type}</h3>
      {Object.keys(config).map((key) => {
        const field = config[key];
        const value = componentProperties[key] || field.defaultValue;

        return (
          <div key={key} className={styles.customizationField}>
            <label>{field.label}</label>
            {field.type === 'text' && (
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
              />
            )}
            {field.type === 'color' && (
              <input
                type="color"
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
              />
            )}
            {field.type === 'number' && (
              <input
                type="number"
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
              />
            )}
            {field.type === 'select' && field.options && (
              <select
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'textarea' && (
              <textarea
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
              />
              
            )}
             
            
          </div>
        );
      })}
      
     {componentProperties.services?.map((service: { title: string; description: string }, index: number) => (
        <div key={index} className={styles.serviceField}>
          <h4>Service {index + 1}</h4>
          <input
            type="text"
            placeholder="Service Title"
            value={service.title}
            onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
          />
          <textarea
            placeholder="Service Description"
            value={service.description}
            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
          />
        </div>
      ))}
      {componentProperties.testimonials?.map((testimonial: { name: string; position: string; text: string }, index: number) => (
        <div key={index} className={styles.testimonialField}>
          <h4>Testimonial {index + 1}</h4>
          <input
            type="text"
            placeholder="Name"
            value={testimonial.name}
            onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            value={testimonial.position}
            onChange={(e) => handleTestimonialChange(index, 'position', e.target.value)}
          />
          <textarea
            placeholder="Testimonial Text"
            value={testimonial.text}
            onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
          />
        </div>
      ))}
      {componentProperties.cards?.map((card: { title: string; price: string; features: string[]; buttonText: string }, index: number) => (
        <div key={index} className={styles.cardField}>
          <h4>Card {index + 1}</h4>
          <input
            type="text"
            placeholder="Card Title"
            value={card.title}
            onChange={(e) => handleCardChange(index, 'title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            value={card.price}
            onChange={(e) => handleCardChange(index, 'price', e.target.value)}
          />
          <textarea
            placeholder="Features (comma-separated)"
            value={card.features.join(', ')}
            onChange={(e) => handleCardChange(index, 'features', e.target.value.split(','))}
          />
          <input
            type="text"
            placeholder="Button Text"
            value={card.buttonText}
            onChange={(e) => handleCardChange(index, 'buttonText', e.target.value)}
          />
        </div>
      ))}
      {componentProperties.members?.map((member: { name: string; position: string; description: string; photoUrl: string }, index: number) => (
        <div key={index} className={styles.memberField}>
          <h4>Member {index + 1}</h4>
          <input
            type="text"
            placeholder="Name"
            value={member.name}
            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            value={member.position}
            onChange={(e) => handleMemberChange(index, 'position', e.target.value)}
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={member.photoUrl}
            onChange={(e) => handleMemberChange(index, 'photoUrl', e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={member.description}
            onChange={(e) => handleMemberChange(index, 'description', e.target.value)}
          />
          <button onClick={() => handleRemoveMember(index)}>Remove Member</button>
          
        </div>
        
      ))}
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
}
    