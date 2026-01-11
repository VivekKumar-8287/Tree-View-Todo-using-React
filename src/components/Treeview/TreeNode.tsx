import React from "react";
import type { TreeNodeData } from "../../types/tree";
import { TreeItem } from "./TreeItem";

interface Props {
  node: TreeNodeData;
  onToggle: (id: string) => void;
  onAdd: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export const TreeNode: React.FC<Props> = ({ node, onToggle, onAdd, onRename, onDelete }) => {
  // Check if it has children OR if it's a leaf node that hasn't loaded its children yet
  const hasChildren = !!(node.children && node.children.length > 0);

  return (
    <div className="relative ml-8 border-l-2 border-dashed border-gray-200 pl-6 py-2">
      {/* Horizontal Connector Line (Tailwind) */}
      <div className="absolute left-0 top-7 w-6 border-t-2 border-dashed border-gray-200"></div>

      <TreeItem
        id={node.id}
        label={node.label}
        isOpen={node.isOpen}
        isLoading={node.isLoading} // This pulls from our new data model
        hasChildren={hasChildren}
        onToggle={() => onToggle(node.id)}
        onAdd={() => onAdd(node.id)}
        onDelete={() => onDelete(node.id)}
        onRename={(newName) => onRename(node.id, newName)}
      />

      {/* Recursive rendering with animation */}
      {node.isOpen && hasChildren && (
        <div className="mt-2 space-y-2 animate-in fade-in duration-300">
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onToggle={onToggle}
              onAdd={onAdd}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};