import styles from '../styles/Hero.module.css';

const Hero = () => {
    return (
      <section className={styles.hero}>
        <div className={styles.container}>
          <img src="logo.png" alt="Build Deploy Logo" className={styles.logo} />
          <div className={styles.tagline}>
            <span className={styles.newBadge}>NEW</span>
            <span className={styles.nextGenText}>Next-generation of Site Building.</span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.site}>Site</span>
            <span className={styles.builder}>Builder</span>
            <span className={styles.icon}>⚡</span>
          </h1>
          <p className={styles.subtitle}>
            Just think about it! Take your website building experience to the next level and boost your productivity. Deploy your websites in just one click.
          </p>
         
        </div>
      </section>
    );
  };
  
  export default Hero;