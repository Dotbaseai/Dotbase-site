import { create } from 'zustand';
import { 
  Node, 
  Edge, 
  Connection, 
  addEdge as rfAddEdge,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
  applyEdgeChanges,
  applyNodeChanges
} from 'reactflow';

type DnDStore = {
  nodes: Node[];
  edges: Edge[];
  instance: ReactFlowInstance | null;
  selectedNodes: Node[];
  selectedEdges: Edge[];
  rfInstance: ReactFlowInstance | null; 
  clearNodes: () => void;
  setNodes: (updater: ((nodes: Node[]) => Node[]) | Node[]) => void;
  setEdges: (updater: ((edges: Edge[]) => Edge[]) | Edge[]) => void;
  addNode: (node: Node) => void;
  updateNode: (id: string, data: any) => void;  // Added updateNode
  addEdge: (connection: Connection) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setInstance: (instance: ReactFlowInstance) => void;
  setRfInstance: (instance: ReactFlowInstance) => void; 
  deleteElements: () => void;
  duplicateSelection: () => void;
  setSelectedElements: (nodes: Node[], edges: Edge[]) => void;
  undoHistory: Array<{ nodes: Node[]; edges: Edge[]; }>;
  redoHistory: Array<{ nodes: Node[]; edges: Edge[]; }>;
  undo: () => void;
  redo: () => void;
  saveCurrentState: () => void;
}

const useDnDStore = create<DnDStore>((set, get) => ({
  nodes: [],
  edges: [],
  instance: null,
  selectedNodes: [],
  selectedEdges: [],
  rfInstance: null, 
  undoHistory: [],
  redoHistory: [],

  setRfInstance: (instance) => set({ rfInstance: instance }),

  clearNodes: () => set({ nodes: [], edges: [] }),

  setNodes: (updater) => set((state) => ({ 
    nodes: typeof updater === 'function' ? updater(state.nodes) : updater 
  })),

  setEdges: (updater) => set((state) => ({ 
    edges: typeof updater === 'function' ? updater(state.edges) : updater 
  })),

  setInstance: (instance) => {
    set({ 
      instance,
      rfInstance: instance 
    });
  },

  addNode: (node) => {
    const state = get();
    state.saveCurrentState();
    set((state) => ({ nodes: [...state.nodes, node] }));
  },

  updateNode: (id, data) => {
    const state = get();
    state.saveCurrentState();
    set((state) => ({
      nodes: state.nodes.map((node) => 
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    }));
  },

  addEdge: (connection) => {
    const state = get();
    state.saveCurrentState();
    set((state) => ({
      edges: rfAddEdge(connection, state.edges)
    }));
  },

  onNodesChange: (changes: NodeChange[]) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes)
    }));
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges)
    }));
  },

  setSelectedElements: (nodes: Node[], edges: Edge[]) => {
    set({ selectedNodes: nodes, selectedEdges: edges });
  },

  deleteElements: () => {
    const state = get();
    state.saveCurrentState();
    
    const selectedNodeIds = new Set(state.selectedNodes.map(node => node.id));
    
    set((state) => ({
      nodes: state.nodes.filter(node => !selectedNodeIds.has(node.id)),
      edges: state.edges.filter(edge => 
        !selectedNodeIds.has(edge.source) && 
        !selectedNodeIds.has(edge.target) &&
        !state.selectedEdges.find(e => e.id === edge.id)
      ),
      selectedNodes: [],
      selectedEdges: []
    }));
  },

  duplicateSelection: () => {
    const state = get();
    state.saveCurrentState();

    const newNodes = state.selectedNodes.map(node => ({
      ...node,
      id: `${node.id}-copy-${Date.now()}`,
      position: {
        x: node.position.x + 50,
        y: node.position.y + 50
      }
    }));

    set((state) => ({
      nodes: [...state.nodes, ...newNodes],
      selectedNodes: newNodes
    }));
  },

  saveCurrentState: () => {
    set((state) => ({
      undoHistory: [...state.undoHistory, { 
        nodes: state.nodes, 
        edges: state.edges 
      }],
      redoHistory: []
    }));
  },

  undo: () => {
    set((state) => {
      const prev = state.undoHistory[state.undoHistory.length - 1];
      if (!prev) return state;

      const newHistory = state.undoHistory.slice(0, -1);
      return {
        nodes: prev.nodes,
        edges: prev.edges,
        undoHistory: newHistory,
        redoHistory: [
          { nodes: state.nodes, edges: state.edges },
          ...state.redoHistory
        ]
      };
    });
  },

  redo: () => {
    set((state) => {
      const next = state.redoHistory[0];
      if (!next) return state;

      const newRedoHistory = state.redoHistory.slice(1);
      return {
        nodes: next.nodes,
        edges: next.edges,
        undoHistory: [
          ...state.undoHistory,
          { nodes: state.nodes, edges: state.edges }
        ],
        redoHistory: newRedoHistory
      };
    });
  }
}));

export default useDnDStore;