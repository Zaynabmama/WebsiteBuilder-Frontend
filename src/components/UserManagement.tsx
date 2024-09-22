'use client';

import { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import styles from '../styles/UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
          const filteredUsers = data.filter((user: { role: string; }) => user.role !== 'admin');
          setUsers(filteredUsers);
          setTotalUsers(filteredUsers.length);
        } else {
          setError('Failed to fetch users.');
        }
      } catch (error) {
        setError('Error fetching users.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
        setTotalUsers(totalUsers - 1); 
      } else {
        setError('Failed to delete user.');
      }
    } catch (error) {
      setError('Error deleting user.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Management</h2>
      <div>
        <h3 className={styles.subtitle}>Total Users: {totalUsers}</h3>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number of Projects</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {users.map(user => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.projects.length}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td className={styles.actions}>
        <button className={styles.iconButton} onClick={() => {}}>
          <AiOutlineEdit />
        </button>
        <button className={styles.iconButton} onClick={() => handleDelete(user._id)}>
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

    </div>
  );
};

export default UserManagement;
