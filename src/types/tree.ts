export interface TreeNodeData {
  id: string;
  label: string;
  isOpen?: boolean;
  children?: TreeNodeData[];
  isLoading?: boolean;
  isLoaded?:boolean;
}