import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TreeItemProps {
  id: string;
  label: string;
  isOpen?: boolean;
  isLoading?: boolean; // Added this line to fix the TS2339 error
  hasChildren: boolean;
  onToggle: () => void;
  onAdd: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
}

export const TreeItem: React.FC<TreeItemProps> = ({
  id,
  label,
  isLoading,
  isOpen,
  hasChildren,
  onToggle,
  onAdd,
  onDelete,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== "" && editValue !== label) {
      onRename(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
    if (e.key === "Escape") {
      setEditValue(label);
      setIsEditing(false);
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="flex items-center group gap-2"
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-grab p-1 text-gray-400 hover:text-gray-600 active:cursor-grabbing"
      >
        ⠿
      </div>

      <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-100 min-w-[250px] justify-between px-3">
        <div className="flex items-center gap-3">
          {/* Unified Icon/Spinner Logic */}
          <div onClick={onToggle} className="cursor-pointer relative flex items-center justify-center">
            {isLoading ? (
              <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
            ) : (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all active:scale-95 ${
                  hasChildren ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500"
                } ${isOpen && hasChildren ? "ring-4 ring-blue-100" : ""}`}
              >
                {label[0].toUpperCase()}
              </div>
            )}
          </div>

          {/* Label / Input */}
          {isEditing ? (
            <input
              autoFocus
              className="border-b-2 border-blue-500 outline-none px-1 text-gray-700 bg-transparent w-full"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span
              className="text-gray-700 font-medium cursor-pointer"
              onDoubleClick={() => setIsEditing(true)}
            >
              {label}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded font-bold"
            title="Add Child"
          >
            +
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); if (window.confirm("Delete this node?")) onDelete(); }}
            className="p-1.5 hover:bg-red-50 text-red-500 rounded"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};