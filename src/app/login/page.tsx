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
        // `router.push('/dashboard');`
        console.log('login done');
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      }
    };
  
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Sign in</h2>
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
        <Button type="submit">Log In</Button>
        <p className={styles.forgotPassword}>
          <a href="#">Forgot your password?</a>
        </p>
        <p className={styles.agreement}>
          By creating an account, you agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
        </p>
        <p className={styles.signup}>
          Dont have an account? <a href="#">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
