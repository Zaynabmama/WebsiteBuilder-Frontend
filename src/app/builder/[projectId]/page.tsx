'use client';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../../../components/BSidebar';
import Canvas from '../../../components/Canvas';
import CustomizationPanel from '../../../components/CustomizationPanel';
import styles from '../../../styles/Builderr.module.css';
import { saveComponents, previewPage, fetchComponents, fetchPageById } from '../../../services/page';
import { useProject } from '../../../context/ProjectContext';
import { ComponentItem } from '../../../type';
import { useParams } from 'next/navigation';
import { advancedPredefinedComponents } from '@/components/dPredefinedComponents';
import Button from '@/components/Button';

export default function ProjectBuilder() {
  const { projectId } = useParams<{ projectId: string }>();
  const { pages, setPages, selectedPage,fetchAndSelectPage, setSelectedPage, } = useProject();
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployMessage, setDeployMessage] = useState('');
  

  useEffect(() => {
    if (selectedPage) {
      const fetchPage = async () => {
        try {
           const page = await fetchComponents(projectId, selectedPage._id);
           setComponents(selectedPage.components || []); 
        } catch (error) {
          console.error('Error fetching page:', error);
        }
      };
      fetchPage();
    }
  }, [projectId,selectedPage]);
  
  const handleSetComponents = (updateFn: (prevComponents: ComponentItem[]) => ComponentItem[]) => {
    const updatedComponents = updateFn(components);
    console.log('Updated components :', updatedComponents);

    if (selectedPage) {
      const updatedPages = pages.map((p) =>
        p._id === selectedPage._id ? { ...p, components: updatedComponents } : p
      );
      setPages(updatedPages);
      setSelectedPage({ ...selectedPage, components: updatedComponents });
      console.log('Updated pages and selectedPage:', updatedPages, { ...selectedPage, components: updatedComponents });
    }
  };
  const handleSave = async () => {
    if (!projectId || !selectedPage) {
      console.error('Project ID or selected page is not defined');
      return;
    }
  
    try {
   
      console.log('Saving components:', components);
      await saveComponents(projectId, selectedPage._id, components);
  
   
      const updatedPage = await fetchPageById(projectId, selectedPage._id);
      const updatedComponents = updatedPage.components || [];
  
 
      handleSetComponents(() => updatedComponents);
  
      console.log('Components saved and updated successfully');
    } catch (error) {
      console.error('Error saving components:', error);
    }
  };
  

  const handlePreview = async () => {
    if (selectedPage) {
      try {
        const url = await previewPage(projectId, selectedPage._id || '');
        window.open(url, '_blank');
      } catch (error) {
        console.error('Error previewing page:', error);
      }
    }
  };
  

  const handleComponentClick = (id: string | undefined): void => {
    const component = components.find(comp => comp._id === id);
    setSelectedComponent(component || null);
    console.log('Component clicked:', component?._id, component);
  };

  const handleDeploy = async () => {
    const projectName = localStorage.getItem('projectName');
    console.log('Project name from local storage:', projectName);
  
    if (!projectName) {
      console.error('Project name is not available');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
  
      const url = `http://localhost:5000/deploy/${encodeURIComponent(projectName)}`;
      console.log('Deployment URL:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Deployment successful:', data);
      } else {
        console.error('Deployment failed:', data);
      }
    } catch (error) {
      console.error('Error during deployment:', error);
    }
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.builderContainer}>
        <Sidebar projectId={projectId} />
        
        <div className={styles.editor}>
          {selectedPage ? (
            <>
              {/* <div className={styles.topBar}>
                <h3> Page Name: {selectedPage.name}</h3> */}
                <div className={styles.buttonContainer}>
                <Button onClick={handleSave} disabled={isSaving} type="button">
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
      <Button onClick={handlePreview} type="button">
        Preview Page
      </Button>
      <Button onClick={handleDeploy} type="button">
        Deploy
      </Button>
                </div>
              {/* </div> */}
              <div className={styles.mainEditorContainer}>
                <div className={styles.canvasContainer}>
                  <Canvas
                    components={components}
                    setComponents={setComponents}
                    selectedComponent={selectedComponent}
                    setSelectedComponent={setSelectedComponent}
                    handleComponentClick={handleComponentClick}
                  />
                </div>
                <div className={styles.customizationContainer}>
                {selectedComponent ? (
                  <CustomizationPanel
                  selectedComponent={selectedComponent}
                  updateComponent={(updatedProperties) => {
                    handleSetComponents((prevComponents) =>
                      prevComponents.map((comp) =>
                        comp._id === selectedComponent._id
                          ? { ...comp, properties: updatedProperties }
                          : comp
                      )
                    );
                  }}
                />
                ) : (
                  <p>Select a component to customize</p>
                )}
  


                </div>
              </div>
            </>
          ) : (
            <h3>Select a page to edit or create a new one.</h3>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
