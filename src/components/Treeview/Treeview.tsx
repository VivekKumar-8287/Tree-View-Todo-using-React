import React from "react";
import type { TreeNodeData } from "../../types/tree";

interface Props {
  node: TreeNodeData;
  onToggle: (id: string) => void;
  onAdd: (id: string) => void;
}

export const TreeNode: React.FC<Props> = ({ node, onToggle, onAdd }) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative ml-6 border-l border-dashed border-gray-300 pl-4 py-2">
      {/* Horizontal Line Connector */}
      <div className="absolute left-0 top-6 w-4 border-t border-dashed border-gray-300"></div>

      <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-fit group">
        <div 
          onClick={() => onToggle(node.id)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold cursor-pointer transition-colors ${
            hasChildren ? "bg-blue-500 hover:bg-blue-600" : "bg-green-400"
          }`}
        >
          {node.label[0]}
        </div>
        
        <span className="text-gray-700 font-medium">{node.label}</span>

        <button 
          onClick={() => onAdd(node.id)}
          className="opacity-0 group-hover:opacity-100 ml-2 bg-gray-100 hover:bg-gray-200 p-1 rounded transition-opacity"
        >
          +
        </button>
      </div>

      {/* Recursive Render */}
      {node.isOpen && hasChildren && (
        <div className="mt-1">
          {node.children?.map((child) => (
            <TreeNode key={child.id} node={child} onToggle={onToggle} onAdd={onAdd} />
          ))}
        </div>
      )}
    </div>
  );
};