'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createProjectService, deleteProjectService, getProjectsService } from '@/services/project';
import UserNavbar from '@/components/userSidebar';
import { useAuthContext } from '../../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';

interface Project {
  _id: string;
  name: string;
  deployment?: {
    status: string;
    url: string;
  };
  pages: any[];
}

export default function DashboardPage() {
  const { user } = useAuthContext(); 
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddProjectInput, setShowAddProjectInput] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectsService();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);


  const handleAddProject = async () => {
    if (!newProjectName.trim()) {
      setValidationError('Please enter a valid project name');
      return;
    }
    setValidationError(null);

    const optimisticProject = { name: newProjectName, _id: Date.now().toString(), pages: [] };

    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, optimisticProject];
      console.log('Optimistic Projects Update:', updatedProjects);
      return updatedProjects;
    });

    try {
      console.log('Creating new project:', newProjectName);

      const startTime = Date.now(); 

      const createdProject = await createProjectService(newProjectName);

      const endTime = Date.now(); 
      console.log('API Response Time:', (endTime - startTime) + 'ms'); 
      console.log('Created Project:', createdProject);

     
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj._id === optimisticProject._id ? createdProject : proj
        )
      );

      setNewProjectName(''); 
      setShowAddProjectInput(false); 
    } catch (err) {
     
      setProjects((prevProjects) =>
        prevProjects.filter((proj) => proj._id !== optimisticProject._id)
      );
      setError('Failed to add project');
    }
  };

  const handleDelete = async (projectId: string) => {
   
      try {
        await deleteProjectService(projectId);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
      } catch (err) {
        setError('Failed to delete project');
      
    }
  };

  return (
    <>
      <UserNavbar />
      <div className={styles.dashboard}>
        <div className={styles.welcomeSection}>
          <h2>Welcome back, {user?.name}!</h2>
          <p>Let's begin your journey in building awesome websites!</p>
        </div>

        <div className={styles.projectsSection}>
          <div className={styles.projectsHeader}>
            <h3>Your Projects</h3>
         
            <button
              onClick={() => setShowAddProjectInput(!showAddProjectInput)}
              className={styles.addProjectButton}
            >
              + Add New Project
            </button>
          </div>


          {showAddProjectInput && (
            <div className={styles.addProjectForm}>
              <input
                type="text"
                placeholder="Enter project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className={styles.input}
              />
              <button onClick={handleAddProject} className={styles.submitButton}>
                Add Project
              </button>
              {validationError && <p className={styles.errorText}>{validationError}</p>}
            </div>
          )}

          {loading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Deployment Status</th>
                    <th>Website</th>
                    <th>Number of Pages</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td>{project.name}</td>
                      <td>{project.deployment?.status || 'Not Deployed'}</td>
                      <td>{project.deployment?.url ? <a href={project.deployment.url} target="_blank" rel="noopener noreferrer">View Website</a> : 'N/A'}</td>
                      <td>{project.pages.length}</td>
                      <td>
                      <FaEdit
  className={styles.icon}
  onClick={() => {
    localStorage.setItem('projectName', project.name); 
    router.push(`/builder/${project._id}`);
  }}
/>

                        <FaTrash
                          className={styles.icon}
                          onClick={() => handleDelete(project._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
