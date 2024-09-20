'use client';

import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from '../../styles/Signup.module.css';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const signUpData = { name, email, password };

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign up successful:', data);
        router.push('/login'); 
      } else {
        const errorData = await response.json();
        console.error('Sign up failed:', errorData.message);
        setSubmissionError(errorData.message); 
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setSubmissionError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create an account</h2>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign up</Button>
      </form>
      {submissionError && <div className={styles.error}>{submissionError}</div>}
      <p className={styles.footerText}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default SignUp;
