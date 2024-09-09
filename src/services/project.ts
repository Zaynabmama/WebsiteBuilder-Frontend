console.log('API URL:', process.env.api);
const api='http://localhost:5000';

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json', 
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers, 
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error('Error:', errorMessage);
    throw new Error(errorMessage || 'Something went wrong');
  }

  return response;
};



export const createProjectService = async (projectName: string): Promise<any> => {
  const response = await fetchWithAuth(`${api}/projects`, {
    method: 'POST',
    body: JSON.stringify({ name: projectName }),
  });

  const project = await response.json();
  console.log('Created Project:', project);
  return project;
};

export const getProjectsService = async (): Promise<any[]> => {
  const response = await fetchWithAuth(`${api}/projects`, {
    method: 'GET',
  });

  return await response.json();
};


export const deleteProjectService = async (projectId: string): Promise<void> => {
  await fetchWithAuth(`${api}/projects/${projectId}`, {
    method: 'DELETE',
  });
};
