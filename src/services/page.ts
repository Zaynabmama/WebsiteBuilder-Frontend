const apiUrl = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchPages = async (projectId: string) => {
  const response = await fetch(`${apiUrl}/project/${projectId}/page`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pages');
  }

  return await response.json();
};

export const createPage = async (projectId: string, pageName: string) => {
  const response = await fetch(`${apiUrl}/project/${projectId}/page`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name: pageName, components: [] }),
  });

  if (!response.ok) {
    throw new Error('Failed to create page');
  }

  return await response.json();
};

export const deletePage = async (projectId: string, pageId: string) => {
  const response = await fetch(`${apiUrl}/project/${projectId}/page/${pageId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to delete page');
  }
};
