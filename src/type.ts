export interface ComponentItem {
  _id?: string;
  type: string;
  properties: Record<string, any>;
}

export interface Page {
  _id: string;
  name: string;
  components: ComponentItem[];
}
