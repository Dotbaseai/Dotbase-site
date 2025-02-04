'use client';

import React from 'react';
import { DotbaseNodesEnum, DOTBASE_NODES } from '@/components/dashboard/nodes/types/nodeTypes';
import { v4 as uuidv4 } from 'uuid';
import '@/styles/styles.css'; 

const Workspace = () => {
  const onDragStart = (event: React.DragEvent, nodeType: DotbaseNodesEnum) => {
    const newNode = {
      ...DOTBASE_NODES[nodeType],
      id: `${nodeType}__${uuidv4()}`
    };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(newNode));
    event.dataTransfer.effectAllowed = 'move';
  };

  const agents = [
    {
      name: "HUB",
      description: "Enables agent collaboration",
      nodeType: DotbaseNodesEnum.HUB
    },
    {
      name: "BRIDGE",
      description: "Mediates between agents and users",
      nodeType: DotbaseNodesEnum.BRIDGE
    },
    {
      name: "NEXUS",
      description: "System message-configured agent",
      nodeType: DotbaseNodesEnum.NEXUS
    },
    {
      name: "LUMINA",
      description: "OpenAI Assistant API integration",
      nodeType: DotbaseNodesEnum.LUMINA
    }
  ];

  const tools = [
    {
      name: "SPARK",
      description: "Custom function support for agents",
      nodeType: DotbaseNodesEnum.SPARK
    }
  ];

  return (
    <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
      <div className="w-[69%] bg-slate-500/10 backdrop-blur-sm rounded-xl p-6">
        <div className="flex justify-evenly">
          {/* Agents Section */}
          <div className="w-[77%] mr-6">
            <h2 className="text-white text-sm font-medium mb-4 font-offbit">AGENTS</h2>
            <div className="flex gap-3 overflow-x-auto custom-scrollbar"> 
              {agents.map((agent, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => onDragStart(e, agent.nodeType)}
                  className="w-[185px] flex-shrink-0 bg-[#1c1c1c] p-3 rounded-lg cursor-move 
                    hover:bg-[#252525] transition-colors border border-[#333333] hover:border-[#444444]"
                >
                  <h3 className="text-white text-sm font-medium mb-1 font-offbit">{agent.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{agent.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[2px] bg-slate-500/20 bottom-4" />


          {/* Tools Section */}
          <div className="w-[22%] ml-6">
            <h2 className="text-white text-sm font-medium mb-4 font-offbit">TOOLS</h2>
            <div className="flex flex-col ">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => onDragStart(e, tool.nodeType)}
                  className="w-[185px] bg-[#1c1c1c] rounded-lg p-3 cursor-move 
                    hover:bg-[#252525] transition-colors border border-[#333333] hover:border-[#444444] min-h-[85px]"
                >
                  <h3 className="text-white text-sm font-medium mb-1 font-offbit">{tool.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
