import { TreeNode } from "./components/Treeview/TreeNode";
import { useTreeData } from "./hooks/useTreeData";
import { initialData } from "./mock/initialData";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { TreeNodeData } from "./types/tree";

function App() {
  const { data, handleToggle, addNode, renameNode, deleteNode, moveNode } = useTreeData(initialData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveNode(active.id as string, over.id as string);
    }
  };

  // Helper to get all IDs for the sortable context
  const getAllIds = (nodes: TreeNodeData[]): string[] => {
    return nodes.reduce((acc, node) => {
      const childrenIds = node.children ? getAllIds(node.children) : [];
      return [...acc, node.id, ...childrenIds];
    }, [] as string[]);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 mb-8 px-4">Tree View Component</h1>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={getAllIds(data)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {data.map((node) => (
                <TreeNode 
                  key={node.id} 
                  node={node} 
                  onToggle={handleToggle} 
                  onAdd={addNode}
                  onRename={renameNode}
                  onDelete={deleteNode}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;