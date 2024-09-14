'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../../../components/BSidebar';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Canvas from '../../../components/Canvas';
import styles from '../../../styles/Builderr.module.css';
import CustomizationPanel from '../../../components/CustomizationPanel'; 

import { ProjectProvider, useProject } from '../../../context/ProjectContext';
import { fetchPages, saveComponents, previewPage } from '../../../services/page';
import { ComponentItem, Page } from '../../../type';

export default function ProjectBuilder() {
  const { projectId } = useParams<{ projectId: string }>();
  const { pages, setPages, selectedPage, setSelectedPage, selectedComponent, setSelectedComponent, updateComponent, previewPage } = useProject();
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (selectedPage) {
      setComponents(selectedPage.components || []);
    }
  }, [selectedPage]);

 
  // const handleSave = () => {
  //   if (!selectedPage) {
  //     console.error('No page selected');
  //     return;
  //   }
   
  //   saveComponents(projectId, selectedPage._id, selectedPage.components);
  // };
  const handleSetComponents = (updateFn: (prevComponents: ComponentItem[]) => ComponentItem[]) => {
    const updatedComponents = updateFn(components);
    setComponents(updatedComponents);

    if (selectedPage) {
      const updatedPages = pages.map((p) =>
        p._id === selectedPage._id ? { ...p, components: updatedComponents } : p
      );
      setPages(updatedPages);
      setSelectedPage({ ...selectedPage, components: updatedComponents });
    }
  };

  const handleSave = async () => {
    if (!projectId) {
      console.error('Project ID is not defined');
      return;
    }
    if (!selectedPage) {
      console.error('No page selected');
      return;
    }

    setIsSaving(true);
    try {
      await saveComponents(projectId, selectedPage._id, components);
    } catch (error) {
      console.error('Error saving components:', error);
    } finally {
      setIsSaving(false);
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

  console.log('Selected Page:', selectedPage);
  // const handleSaveComponents = async () => {
  //   if (!selectedPage) {
  //     console.error('No page selected');
  //     return;
  //   }
  
  //   try {
  //     setIsSaving(true);
  //     await saveComponents(projectId, selectedPage._id, selectedPage.components);
  //   } catch (error) {
  //     console.error('Error saving components:', error);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };
 

  // const updateComponent = (updatedProperties: Record<string, any>) => {
  //   if (selectedComponent && selectedPage) {
  //     const updatedComponents = selectedPage.components.map((component) =>
  //       component === selectedComponent ? { ...component, properties: updatedProperties } : component
  //     );
  //     setSelectedPage({ ...selectedPage, components: updatedComponents });
  //   }
  // };

  return (
    
      <DndProvider backend={HTML5Backend}>
    <div className={styles.builderContainer}>
      <Sidebar projectId={projectId} />
      <div className={styles.editor}>
        {selectedPage ? (
          <>
            <div className={styles.topBar}>
                <h3>Editing Page: {selectedPage.name}</h3>
                <div className={styles.buttonContainer}>
                  <button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Components'}
                  </button>
                  <button onClick={handlePreview}>
                    Preview Page
                  </button>
                </div>
              </div>
             
        
            <div className={styles.mainEditorContainer}>
               <div className={styles.canvasContainer}>
                {/* <Canvas
                components={selectedPage.components}
                setComponents={(components: ComponentItem[]) => {
                  const updatedPages = pages.map((p) =>
                    p._id === selectedPage._id ? { ...p, components } : p
                  );
                  setPages(updatedPages);
                  setSelectedPage({
                    ...selectedPage,
                    components,
                  });
                }}
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
              
              /> */}
               <Canvas
                      components={components}
                      setComponents={handleSetComponents}
                      selectedComponent={selectedComponent}
                      setSelectedComponent={setSelectedComponent}
                    />
              </div>
                <div className={styles.customizationContainer}>
              {/* <CustomizationPanel
                // selectedComponent={selectedComponent}
                updateComponent={updateComponent}
              /> */}
              </div>
              </div>
              {/* <div className={styles.buttonContainer}>
              
              <button onClick={handleSaveComponents} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Components'}
              </button>
              <button onClick={handlePreview}>
  Preview Page
</button>
</div> */}
            </>
          ) : (
            <h3>Select a page to edit or create a new one.</h3>
            
          )}
        </div>
      </div>
     
      </DndProvider>
 
  );

}