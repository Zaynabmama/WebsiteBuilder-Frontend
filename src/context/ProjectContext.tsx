'use client';
import { ComponentItem, Page } from '../type'; 
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {  fetchPages, fetchPageById,createPage as create, deletePage as deletefromservice, saveComponents as save, previewPage as preview} from '../services/page';

interface ProjectContextType {
  pages: Page[];
  setPages: (pages: Page[]) => void;
  selectedPage: Page | null;
  setSelectedPage: (page: Page | null) => void;

  isSaving: boolean;
  selectPage: (page: Page) => void;
  fetchAndSelectPage:(projectId: string, pageId: string) => Promise<void>;
  // saveComponents: (projectId: string, pageId: string, components: ComponentItem[]) => Promise<void>;
  saveComponents: (pageId: string, components: ComponentItem[]) => Promise<void>;
  previewPage: (projectId: string, pageId: string) => Promise<string>;
  // updateComponent: (updatedProperties: Record<string, any>) => void;
  addPage: (projectId: string, name: string) => Promise<void>;
  deletePage: (projectId: string, pageId: string) => Promise<void>;
}


const ProjectContext = createContext<ProjectContextType | undefined>(undefined);


export const ProjectProvider: React.FC<{ projectId: string; children: ReactNode }> = ({ projectId, children }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);

  const selectPage = (page: Page) => {
  
    setSelectedPage(page);
  };
  const fetchAndSelectPage = async (pageId: string) => {
    try {
      const fetchedPage = await fetchPageById(projectId, pageId);
      setSelectedPage(fetchedPage);
    } catch (error) {
      console.error('Failed to fetch page:', error);
    }
  };

  const addPage = async (projectId: string, name: string) => {
    try {
      const newPage = await create(projectId, name);
      setPages((prevPages) => [...prevPages, newPage]);
    } catch (error) {
      console.error('Failed to add page:', error);
    }
  };
  
  const deletePage = async (projectId: string, pageId: string) => {
    try {
      await deletefromservice(projectId, pageId);
      setPages((prevPages) => prevPages.filter((page) => page._id !== pageId));
    } catch (error) {
      console.error('Failed to delete page:', error);
    }
  };

  const saveComponents = async (pageId: string, components: ComponentItem[]) => {
    setIsSaving(true);
    try {
      const updatedPage = await save(projectId, pageId, components);
      setPages(prevPages =>
        prevPages.map(p => p._id === updatedPage._id ? updatedPage : p)
      );
      setSelectedPage(updatedPage);
      console.log('Components saved successfully');
    } catch (error) {
      console.error('Error saving components:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  
  


  const previewPage = async (pageId: string): Promise<string> => {
    if (!projectId) return '';
    return await preview(projectId, pageId);
  };



  return (
    <ProjectContext.Provider
      value={{
        pages,
        selectedPage,
        setSelectedPage,
        fetchAndSelectPage,
        setPages,
        selectPage,

        saveComponents,
        isSaving,
        previewPage,
      
        addPage,
        deletePage,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
