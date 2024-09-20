import React from 'react';
import styles from '../styles/Service.module.css';
import { ServiceProperties } from '@/interface';

const ServiceComponent = ({ properties }: { properties: ServiceProperties }) => {
  const { 
    backgroundColor, 
    color, 
    services,
    flexDirection, 
    justifyContent, 
    alignItems 
  } = properties;

  return (
    <div 
      className={styles.serviceContainer} 
      style={{
        backgroundColor,
        color,
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        padding: '20px',
        flexWrap: 'wrap',
        gap: '20px',
      }}
    >
      {services.map((service: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; features: any[]; }, index: React.Key | null | undefined) => (
        <div key={index} className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <p className={styles.serviceDescription}>{service.description}</p>
          <ul className={styles.serviceFeatures}>
            {service.features.map((feature, i) => (
              <li key={i} className={styles.serviceFeature}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceComponent;
