export const loginService = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', 
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return await response.json(); // Return user data
  };