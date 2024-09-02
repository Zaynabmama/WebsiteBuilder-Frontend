'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Login.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // console.log('login ', { email, password });
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        
        
        localStorage.setItem('token', data.access_token);
        
        // router.push('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
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
