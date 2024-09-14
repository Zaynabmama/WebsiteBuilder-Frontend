
import { ComponentItem, Page } from '../type'; 

const getAuthToken = () => localStorage.getItem('token') || '';

export const fetchPages = async (projectId: string): Promise<Page[]> => {
  const response = await fetch(`http://localhost:5000/project/${projectId}/page`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pages');
  }
  const pagesData: Page[] = await response.json();
  return pagesData;
};

export const createPage = async (projectId: string, name: string): Promise<Page> => {
  const response = await fetch(`http://localhost:5000/project/${projectId}/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to create page');
  }

  const pageData: Page = await response.json();
  return pageData;
};

export const deletePage = async (projectId: string, pageId: string): Promise<void> => {
  const response = await fetch(`http://localhost:5000/project/${projectId}/page/${pageId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete page');
  }
};

export const saveComponents = async (projectId: string, pageId: string, components: ComponentItem[]) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found, user not authenticated');
  }

  const response = await fetch(`http://localhost:5000/components/${projectId}/${pageId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify( components ),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to save components');
  }

  return response.json();
};


export const fetchComponents = async (projectId: string, pageId: string): Promise<ComponentItem[]> => {
  const response = await fetch(`http://localhost:5000/components/${projectId}/${pageId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json', 
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch components');
  }

  const data = await response.json();
  return data.components;
};


export const previewPage = async (projectId: string, pageId: string): Promise<string> => {
  const response = await fetch(`http://localhost:5000/project/${projectId}/page/${pageId}/preview`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to preview page');
  }

  const { previewUrl } = await response.json();
  return previewUrl;
};
