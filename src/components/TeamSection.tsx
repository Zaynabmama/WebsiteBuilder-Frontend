import React, { useState } from 'react';
import { TeamSectionProperties } from "@/interface"; 
import styles from '../styles/TeamSection.module.css';

const TeamSection = ({ properties }: { properties: TeamSectionProperties }) => {
  const { title, members } = properties;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
  };

  const prevMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + members.length) % members.length);
  };

  return (
    <section className={styles.teamSection}>
      <h2 className={styles.teamTitle}>{title}</h2>
      <div className={styles.memberContainer}>
        <button className={styles.carouselButton} onClick={prevMember}>
          &lt;
        </button>
        <div className={styles.teamMember}>
          <img src={members[currentIndex].photoUrl} alt={members[currentIndex].name} className={styles.teamMemberPhoto} />
          <h3 className={styles.teamMemberName}>{members[currentIndex].name}</h3>
          <p className={styles.teamMemberPosition}>{members[currentIndex].position}</p>
          <p className={styles.teamMemberDescription}>{members[currentIndex].description}</p>
        </div>
        <button className={styles.carouselButton} onClick={nextMember}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default TeamSection;
