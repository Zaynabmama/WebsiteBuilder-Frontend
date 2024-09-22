'use client';

import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from '../styles/ProjectManagement.module.css';

const ProjectManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        const errorData = await response.json();
        setError(`Failed to fetch users: ${errorData.message}`);
      }
    } catch (error) {
      setError('Error fetching users.');
    }
  };

  const handleDelete = async (projectId: string) => {
    console.log(`Deleting project with ID: ${projectId}`);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Project deleted successfully');
        fetchUsers(); 
      } else {
        const errorData = await response.json();
        setError(`Failed to delete project: ${errorData.message}`);
        console.error('Delete error:', errorData);
      }
    } catch (error) {
      setError('Error deleting project.');
      console.error('Delete request error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Project Management</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.tableContainer}> 
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Number of Pages</th>
              <th>Creation Date</th>
              <th>Created By</th>
              <th>Deployment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) =>
              user.projects.map((project: any) => (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>{project.pages.length}</td>
                  <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                  <td>{user.name}</td>
                  <td>{project.deployment?.status === 'deployed' ?(
                   <a href={project.deployment.url} target="_blank" rel="noopener noreferrer">
                   View Website
                   </a>
               ) : (
                 'N/A'
                  )}
                  </td>
                  <td>
                    <button className={styles.deleteButton} onClick={() => handleDelete(project._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}

export default ProjectManagement;
