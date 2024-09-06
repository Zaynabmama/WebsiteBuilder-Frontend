'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../../../components/BSidebar';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Canvas from '../../../components/Canvas';
import styles from '../../../styles/builder.module.css';

interface Page {
  _id: string;
  name: string;
  components: any[];
}

export default function ProjectBuilder() {
  const { projectId } = useParams();
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false); 


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

  const handleSelectPage = (page: Page) => {
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
  
  const handleAddPage = async (name: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      const newPage = {
        name,
        components: [],
      };
  
      const response = await fetch(`http://localhost:5000/project/${projectId}/page`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPage),
      });
  
      if (response.ok) {
        const createdPage = await response.json();
        setPages([...pages, createdPage]);  
        setSelectedPage(createdPage); 
      } else {
        console.error('Failed to create page');
      }
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  const validateComponents = (components: any[]) => {
    return components.map((component) => {
  
      if (!component.type) {
        throw new Error('Component type is missing');
      }
      if (!component.properties) {
        component.properties = {};
      }
      return component;
    });
  };
  const handleSaveComponents = async () => {
    if (!selectedPage) {
      console.error('No page selected');
      return;
    }
  
    setIsSaving(true); 
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, user not authenticated');
        return;
      }
  
      const response = await fetch(`http://localhost:5000/components/${projectId}/${selectedPage._id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedPage.components),
      });
  
      if (response.ok) {
        console.log('Components saved successfully');
        const updatedPage = await response.json();
  
        const updatedPages = pages.map((p) =>
          p._id === selectedPage._id ? updatedPage : p
        );
        setPages(updatedPages);
        setSelectedPage(updatedPage);
      } else {
        const errorMsg = await response.text();
        console.error( errorMsg);
      }
    } catch (error) {
      console.error( error);
    } finally {
      setIsSaving(false);
    }
  };
    


  return (
    <DndProvider backend={HTML5Backend}>
    <div className={styles.builderContainer}>
      <Sidebar
        onAddPage={handleAddPage}
        pages={pages}
        onSelectPage={handleSelectPage}
        onDeletePage={handleDeletePage}
      />
      <div className={styles.editor}>
        {selectedPage ? (
          <>
            <h3>Editing Page: {selectedPage.name}</h3>
            <Canvas
                components={selectedPage.components}
                setComponents={(components: any) => {
                  const updatedPages = pages.map((p) =>
                    p._id === selectedPage._id ? { ...p, components } : p
                  );
                  setPages(updatedPages);
                  setSelectedPage({
                    ...selectedPage,
                    components,
                  });
                }}
              />
              <button onClick={handleSaveComponents} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Components'}
              </button>
            </>
          ) : (
            <h3>Select a page to edit or create a new one.</h3>
          )}
        </div>
      </div>
    </DndProvider>
  );

}