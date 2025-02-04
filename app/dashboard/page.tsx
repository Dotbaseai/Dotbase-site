'use client';

import React from 'react';
import ReactFlow, { 
  Background, 
  // Controls, 
  BackgroundVariant,
  ReactFlowProvider,
  Node,
  ReactFlowInstance,
  Edge,
  useKeyPress,
  SelectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CUSTOM_DOTBASE_NODES } from '@/components/dashboard/nodes/types/nodeTypes';
import UtilBar from '@/components/dashboard/main/UtilBar';
import Workspace from '@/components/dashboard/main/Workspace';
import useDnDStore from '@/stores/useDnDStore';
import Image from 'next/image';
import projectLogo from '@/public/assets/logo/full_wlogo.png';

import { X } from 'lucide-react';


const Dashboard = () => {
  const { 
    nodes, 
    edges, 
    addNode, 
    addEdge,
    onNodesChange,
    onEdgesChange, 
    setInstance,
    deleteElements,
    duplicateSelection,
    setSelectedElements,
    undo,
    redo
  } = useDnDStore();

  // Keyboard shortcuts
  const deletePressed = useKeyPress(['Backspace', 'Delete']);
  const ctrlPressed = useKeyPress(['Control', 'Meta']);
  const shiftPressed = useKeyPress('Shift');
  const cPressed = useKeyPress('c');
  // const vPressed = useKeyPress('v');
  const zPressed = useKeyPress('z');
  const yPressed = useKeyPress('y');
  const [showTutorial, setShowTutorial] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const tutorialWatched = localStorage.getItem('tutorialWatched');
    if (!tutorialWatched) {
      setShowTutorial(true);
    }
  }, []);

  // Auto-play video when modal opens
  React.useEffect(() => {
    if (showTutorial && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, [showTutorial]);

  // Rest of your existing keyboard shortcuts and handlers...

  const handleCloseTutorial = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowTutorial(false);
  };

  const handleDontShowAgain = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    localStorage.setItem('tutorialWatched', 'true');
    setShowTutorial(false);
  };

  React.useEffect(() => {
    if (deletePressed) {
      deleteElements();
    }
  }, [deletePressed, deleteElements]);

  React.useEffect(() => {
    if (ctrlPressed && cPressed) {
      duplicateSelection();
    }
    if (ctrlPressed && zPressed) {
      if (shiftPressed || yPressed) {
        redo();
      } else {
        undo();
      }
    }
  }, [ctrlPressed, cPressed, zPressed, yPressed, shiftPressed, duplicateSelection, undo, redo]);

  const onInit = React.useCallback((instance: ReactFlowInstance) => {
    setInstance(instance);
  }, [setInstance]);

  const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    };

    try {
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const newNode: Node = {
        ...nodeData,
        position,
        data: { ...nodeData.data, label: nodeData.data?.label || nodeData.type },
      };
      addNode(newNode);
    } catch (error) {
      console.error('Error adding new node:', error);
    }
  }, [addNode]);

  const onSelectionChange = React.useCallback(
    (params: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedElements(params.nodes, params.edges);
    },
    [setSelectedElements]
  );

  return (
    <div className="relative w-full h-screen bg-[#1A1A1A]">
      {/* Logo */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
        <Image 
          src={projectLogo} 
          alt="Project Logo"
          width={120}
          height={40}
          className="object-fill"
          priority
        />
      </div>
      
      <UtilBar onTutorialClick={() => setShowTutorial(true)} />
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onInit={onInit}
          onConnect={addEdge}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onSelectionChange={onSelectionChange}
          nodeTypes={CUSTOM_DOTBASE_NODES}
          defaultViewport={{ x: 2, y: 2, zoom: 1 }}
          minZoom={0.6}
          maxZoom={1.2}
          className="h-full bg-[#1A1A1A]"
          snapToGrid={true}
          snapGrid={[15, 15]}
          fitView
          nodesDraggable={true}
          nodesConnectable={true}
          selectNodesOnDrag={false}
          selectionMode={SelectionMode.Partial}
          selectionOnDrag={true}
          multiSelectionKeyCode={['Control', 'Meta']}
          deleteKeyCode={['Backspace', 'Delete']}
        >
          <Background color="#333333" gap={15} size={1} variant={BackgroundVariant.Dots} />
          {/* <Controls 
            className="!bg-[#252525] !border !border-[#333333] !rounded-md overflow-hidden"
            showInteractive={false}
          /> */}
          <Workspace />
        </ReactFlow>
      </ReactFlowProvider>
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#252525] rounded-lg p-6 max-w-[800px] w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-semibold">Getting Started with DotBase</h2>
              <button
                onClick={handleCloseTutorial}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="aspect-video w-full bg-black rounded-md overflow-hidden mb-4 ">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                playsInline
                src="/assets/images/demo.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-4 mb-4 p-4 bg-[#1A1A1A] rounded-md">
              <h3 className="text-white text-lg font-medium mb-2">Quick Tips</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-[#333333] px-2 py-0.5 rounded text-sm mr-2">Backspace</span>
                  Delete selected nodes
                </li>
                <li className="flex items-center">
                  <span className="bg-[#333333] px-2 py-0.5 rounded text-sm mr-2">Ctrl + Click</span>
                  Select Multiple nodes
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-[#333333]"
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleDontShowAgain();
                    }
                  }}
                />
                <p>Don&apos;t forget to save</p>
              </label>
              <button
                onClick={handleCloseTutorial}
                className="px-4 py-2 bg-[#410e66] text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;