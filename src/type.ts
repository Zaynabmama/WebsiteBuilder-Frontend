// export interface ComponentItem {
//   _id?: string;
//   type: string;
//   label:string;
//   properties: Record<string, any>;
//   children?: ComponentItem[];
// }
// import React from 'react';

export interface ComponentItem {
  _id?: string;
  type: string;
  properties: React.CSSProperties; 
  label?: string;
}

export interface Page {
  _id: string;
  name: string;
  components: ComponentItem[];
}

// export interface ComponentProps {
//   properties?: Record<string, any>;
// }


export interface Project {
  _id: string;
  name: string;
  pages: Page[];
}
