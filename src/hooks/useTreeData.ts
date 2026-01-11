import { useState } from "react";
import type { TreeNodeData } from "../types/tree";
// Removed arrayMove since you are using a custom recursive move logic

export const useTreeData = (initial: TreeNodeData[]) => {
  const [data, setData] = useState<TreeNodeData[]>(initial);

  // Helper function to update a node's properties deep in the tree
  // Defined inside the hook so it's accessible to all methods
  const updateNode = (nodes: TreeNodeData[], id: string, updates: Partial<TreeNodeData>): TreeNodeData[] => {
    return nodes.map(node => {
      if (node.id === id) return { ...node, ...updates };
      if (node.children) return { ...node, children: updateNode(node.children, id, updates) };
      return node;
    });
  };

  // 1. Move Node (Drag and Drop)
  const moveNode = (activeId: string, overId: string) => {
    if (activeId === overId) return;

    const updateHierarchy = (nodes: TreeNodeData[]): TreeNodeData[] => {
      let movedItem: TreeNodeData | null = null;

      // Find and remove the node from old position
      const findAndRemove = (list: TreeNodeData[]): TreeNodeData[] => {
        return list.filter(node => {
          if (node.id === activeId) {
            movedItem = node;
            return false;
          }
          if (node.children) {
            node.children = findAndRemove(node.children);
          }
          return true;
        });
      };

      const newData = findAndRemove([...nodes]);

      // Insert it into the new position
      const insertAt = (list: TreeNodeData[]): TreeNodeData[] => {
        const overIndex = list.findIndex(n => n.id === overId);
        if (overIndex !== -1 && movedItem) {
          const result = [...list];
          result.splice(overIndex, 0, movedItem);
          return result;
        }
        return list.map(node => ({
          ...node,
          children: node.children ? insertAt(node.children) : []
        }));
      };

      return movedItem ? insertAt(newData) : nodes;
    };

    setData(prev => updateHierarchy(prev));
  };

  // 2. Rename a Node
  const renameNode = (id: string, newLabel: string) => {
    setData(prev => updateNode(prev, id, { label: newLabel }));
  };

  // 3. Delete a Node
  const deleteNode = (id: string) => {
    const filterNodes = (nodes: TreeNodeData[]): TreeNodeData[] => {
      return nodes
        .filter((node) => node.id !== id)
        .map((node) => ({
          ...node,
          children: node.children ? filterNodes(node.children) : [],
        }));
    };
    setData(filterNodes(data));
  };

  // 4. Lazy Loading Toggle
  const handleToggle = async (id: string) => {
    // Check current state to see if it's already loaded
    
    const findNode = (nodes: TreeNodeData[]): TreeNodeData | undefined => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
    };

    const targetNode = findNode(data);


    // If already open, just close it (no loading needed)
    if (targetNode?.isOpen) {
      setData(prev => updateNode(prev, id, { isOpen: false }));
      return;
    }

    // Set loading state
    setData(prev => updateNode(prev, id, { isLoading: true }));

    // Simulate API call delay if not loaded yet
    if (targetNode && !targetNode.isLoaded) {
        // console.log(`📡 Simulating API call for node: ${targetNode.label}`); 
      await new Promise(resolve => setTimeout(resolve, 800));
        // console.log(`✅ Data fetched for node: ${targetNode.label}`);
    }

    // Update state to open and loaded
    setData(prev => updateNode(prev, id, { 
      isLoading: false, 
      isLoaded: true, 
      isOpen: true 
    }));
  };

  // 5. Add Node
  const addNode = (parentId: string) => {
    const newNode: TreeNodeData = { id: crypto.randomUUID(), label: "New Item" };
    const insert = (nodes: TreeNodeData[]): TreeNodeData[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return { ...node, isOpen: true, children: [...(node.children || []), newNode] };
        }
        if (node.children) return { ...node, children: insert(node.children) };
        return node;
      });
    };
    setData(insert(data));
  };

  return { data, handleToggle, addNode, renameNode, deleteNode, moveNode };
};