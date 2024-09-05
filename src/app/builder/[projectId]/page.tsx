'use client';


import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProjectBuilder() {
  const { projectId } = useParams();
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
  
        const response = await fetch(`http://localhost:5000/project/${projectId}/page`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setPages(data);
        } else {
          console.error('Failed to fetch pages');
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };
  
    if (projectId) fetchPages();
  }, [projectId]);
  

  return (
    <div>
      <h1>Project Builder for Project ID: {projectId}</h1>
      <ul>
      {pages.map(page => (
        <li key={page._id}>{page.name}</li>
      ))}
    </ul>
    </div>
  );
}