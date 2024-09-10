const apiUrl = 'http://localhost:5000';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
};

export const fetchPages = async (projectId: string): Promise<Page[]> => {
  const token = getToken();
  const response = await fetch(`${apiUrl}/project/${projectId}/page`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pages');
  }

  return response.json();
};

export const createPage = async (projectId: string, name: string): Promise<Page> => {
  const token = getToken();
  const response = await fetch(`${apiUrl}/project/${projectId}/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, components: [] })
  });

  if (!response.ok) {
    throw new Error('Failed to create page');
  }

  return response.json();
};

export const deletePage = async (projectId: string, pageId: string): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${apiUrl}/project/${projectId}/page/${pageId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete page');
  }
};


export  interface Page {
  _id: string;
  name: string;
  components: ComponentItem[];
}

export  interface ComponentItem {
  type: string;
  properties: Record<string, any>;
}
