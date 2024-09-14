'use client';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../../../components/BSidebar';
import Canvas from '../../../components/Canvas';
import CustomizationPanel from '../../../components/CustomizationPanel';
import styles from '../../../styles/Builderr.module.css';
import { saveComponents, previewPage } from '../../../services/page';
import { useProject } from '../../../context/ProjectContext';
import { ComponentItem } from '../../../type';
import { useParams } from 'next/navigation';

export default function ProjectBuilder() {
  const { projectId } = useParams<{ projectId: string }>();
  const { pages, setPages, selectedPage, setSelectedPage } = useProject();
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSetComponents = (updateFn: (prevComponents: ComponentItem[]) => ComponentItem[]) => {
    const updatedComponents = updateFn(components);
    console.log('Updated components in handleSetComponents:', updatedComponents);

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
    
    setIsSaving(true);
    try {
      console.log('Saving components:', components);
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

  function handleComponentClick(id: string | undefined): void {
    console.log('Component clicked:', id);
  
  }

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
                  <Canvas
                    components={components}
                    setComponents={setComponents}
                    selectedComponent={selectedComponent}
                    setSelectedComponent={setSelectedComponent}
                    handleComponentClick={handleComponentClick}
                  />
                </div>
                <div className={styles.customizationContainer}>
                  <CustomizationPanel
                    selectedComponent={selectedComponent}
                    updateComponent={(updatedProperties) => {
                      if (selectedComponent) {
                        console.log('Updating component with properties:', updatedProperties); 
                        handleSetComponents((prevComponents) =>
                          prevComponents.map((comp) =>
                            comp._id === selectedComponent._id
                              ? { ...comp, properties: updatedProperties }
                              : comp
                          )
                        );
                      }
                    }}
                  />
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
