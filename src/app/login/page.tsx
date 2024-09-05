'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Login.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuthContext } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); 
  const { handleLogin } = useAuthContext();
  const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
  
    // console.log('login ', { email, password });
  
      try {
        await handleLogin(email, password);
        router.push('/dashboard');
        console.log('login done');
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      }
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Sign In</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className={styles.submitButton}>Log In</Button>
          </form>
          <p className={styles.forgotPassword}><a href="#">Forgot your password?</a></p>
          <p className={styles.signup}>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    );
  }