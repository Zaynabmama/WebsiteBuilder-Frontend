'use client';

import Sidebar from '../../../components/BSidebar';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProjectBuilder() {
  const { projectId } = useParams();
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);


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

  const handleSelectPage = (page: any) => {
    setSelectedPage(page);
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`http://localhost:5000/project/${projectId}/page/${pageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPages(pages.filter(page => page._id !== pageId)); 
        if (selectedPage?._id === pageId) {
          setSelectedPage(null); 
        }
      } else {
        console.error('Failed to delete page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };
  

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        onAddPage={() => console.log('Add Page')}
        pages={pages}
        onSelectPage={handleSelectPage}
        onDeletePage={handleDeletePage}
      />
      <div>
    {selectedPage && <h2>Editing Page: {selectedPage.name}</h2>}
    </div>
    </div>
  );
}