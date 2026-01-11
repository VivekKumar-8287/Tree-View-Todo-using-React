import type { TreeNodeData } from "../types/tree";

export const initialData: TreeNodeData[] = [
  {
    id: "root-1",
    label: "Level A",
    isOpen: true,
    children: [
      {
        id: "child-1",
        label: "Level B",
        isOpen: true,
        children: [
          { id: "child-1-1", label: "Level C" },
          { id: "child-1-2", label: "Level C" },
        ],
      },
      { id: "child-2", label: "Level B" },
    ],
  },
];