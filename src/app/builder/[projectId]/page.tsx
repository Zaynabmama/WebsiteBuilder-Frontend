'use client';

import { useParams } from 'next/navigation';

export default function ProjectBuilder() {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Project Builder for Project ID: {projectId}</h1>
    </div>
  );
}