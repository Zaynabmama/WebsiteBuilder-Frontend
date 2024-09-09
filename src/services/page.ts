const apiUrl = 'http://localhost:5000';

export const fetchPages = async (projectId: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${apiUrl}/project/${projectId}/page`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await response.json();
};

export const createPage = async (projectId: string, pageName: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${apiUrl}/project/${projectId}/page`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name: pageName, components: [] })
  });
  return await response.json();
};

export const deletePage = async (projectId: string, pageId: string) => {
  const token = localStorage.getItem('token');
  await fetch(`${apiUrl}/project/${projectId}/page/${pageId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
};
