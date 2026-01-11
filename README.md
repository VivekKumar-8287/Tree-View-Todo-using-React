
# Custom Tree View Component

A fully functional, recursive Tree View component built with **React**, **TypeScript**, and **Tailwind CSS**. This project demonstrates advanced frontend patterns including recursive rendering, complex state management, and asynchronous data simulation.

## 🚀 Features

* **Recursive Hierarchy:** Supports infinite nesting levels using a self-referencing component structure.
* **Drag & Drop:** Seamlessly reorder nodes within the same level or move them across different parent nodes using `@dnd-kit`.
* **Lazy Loading:** Simulates asynchronous API calls with a loading spinner and 800ms delay when expanding nodes for the first time.
* **Inline Editing:** Double-click any node label to rename it instantly.
* **CRUD Operations:** Easily add child nodes or delete entire sub-trees with a confirmation safety check.
* **Modern UI:** Clean, professional interface styled with Tailwind CSS, featuring dashed connector lines and hover-triggered action buttons.

## 🛠️ Tech Stack

* **Framework:** React (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Drag & Drop:** `@dnd-kit/core` & `@dnd-kit/sortable`
* **Icons:** Custom CSS & SVG-based indicators

## 📂 Project Structure

```text
src/
├── components/
│   ├── Treeview/
│   │   ├── TreeView.tsx   # Entry point & DndContext provider
│   │   ├── TreeNode.tsx   # Recursive logic & hierarchy lines
│   │   └── TreeItem.tsx   # UI row, Dnd hooks, & editing logic
├── hooks/
│   └── useTreeData.ts     # Master hook for recursive CRUD logic
├── types/
│   └── tree.ts            # TypeScript interfaces for Node data
└── mock/
    └── initialData.ts     # Sample data for initial render

```

## 🧠 Technical Implementation

### Recursive State Logic

Since the tree is a nested JSON object, all updates (Add, Delete, Move, Rename) are handled using **Depth-First Search (DFS)**. The `useTreeData` hook creates an immutable copy of the state and recursively searches for the target ID before applying changes.

### Drag & Drop (Across Hierarchies)

Moving a node from "Parent A" to "Parent B" involves:

1. **Extraction:** Removing the node from its original position in the nested structure.
2. **Flattening:** Providing `dnd-kit` with a flattened list of IDs so it recognizes every level as a valid drop target.
3. **Injection:** Splitting the target parent's children array and inserting the moved node at the specific index.

### Lazy Loading Simulation

To satisfy the async requirement, the `handleToggle` function is `async`. It checks an `isLoaded` flag on the node:

* If `false`: Displays an `animate-spin` Tailwind loader and waits for a `Promise` to resolve.
* If `true`: Opens the node instantly to mimic cached data behavior.

## 🏁 Getting Started

1. **Install dependencies:**
```bash
npm install

```


2. **Run the development server:**
```bash
npm run dev

```


3. **Build for production:**
```bash
npm run build

```



---
