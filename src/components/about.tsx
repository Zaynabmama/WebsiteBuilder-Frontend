
import { FaBolt, FaCogs, FaRocket, FaUserFriends } from 'react-icons/fa'; 
import styles from '../styles/AboutSection.module.css';
import Button from './Button';

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Build, Customize, and Deploy Your Website with Ease</h2>
          <p className={styles.description}>
            Our intuitive drag-and-drop interface allows you to design stunning websites without any coding knowledge.
          </p>
          <div className={styles.buttons}>
           
            <button className={styles.watchVideo}>Watch Video</button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="m_image.png" alt="Man working on laptop" className={styles.image} />
        </div>
      </div>
      
      <div className={styles.features}>
        <div className={styles.featureItem}>
          <FaBolt className={styles.icon} />
          <div>
            <h3 className={styles.featureTitle}>Drag & Drop</h3>
            <p className={styles.featureDescription}>
              Create stunning web pages with our intuitive drag and drop interface.
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <FaCogs className={styles.icon} />
          <div>
            <h3 className={styles.featureTitle}>Customizable</h3>
            <p className={styles.featureDescription}>
              Tailor your website to reflect your brand’s unique personality.
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <FaRocket className={styles.icon} />
          <div>
            <h3 className={styles.featureTitle}>Deploy Fast</h3>
            <p className={styles.featureDescription}>
              Launch your website quickly with just a few clicks.
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <FaUserFriends className={styles.icon} />
          <div>
            <h3 className={styles.featureTitle}>User-Friendly</h3>
            <p className={styles.featureDescription}>
              Designed for everyone, regardless of technical skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
