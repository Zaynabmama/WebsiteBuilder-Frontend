
// export interface ComponentItem {
//   _id?: string;
//   type: string;
//   properties: React.CSSProperties;
//   text?: string;
//   children?: ComponentItem[]; 
// }

 export interface Page {
   _id: string;
   name: string;
   components: ComponentItem[];
}

// // export interface ComponentProps {
// //   properties?: Record<string, any>;
// // }


// export interface Project {
//   _id: string;
//   name: string;
//   pages: Page[];
// }
interface ComponentProperties {
  [key: string]: any; 
}

export interface ComponentItem {
  type: string;
  properties: ComponentProperties; 

  _id?: string;
}
