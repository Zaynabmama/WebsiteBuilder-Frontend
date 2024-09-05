export const loginService = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
   
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json(); 
    console.log('Login response:', data);
    localStorage.setItem('token', data.access_token);
    return { 
      token: data.access_token, 
      user: data.user 
    };
  };
  