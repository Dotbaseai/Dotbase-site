'use client';

import { Node, Edge } from 'reactflow';
import { DotbaseNodesEnum } from '@/components/dashboard/nodes/types/nodeTypes';
import { OAIModelsEnum } from '@/utils/enum';

// Updated generateImports to include .env configuration
const generateImports = () => `import os
import autogen
from autogen.agentchat.contrib.gpt_assistant_agent import GPTAssistantAgent
from autogen import UserProxyAgent
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API keys from environment variables
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_ASSISTANT_ID = os.getenv('OPENAI_ASSISTANT_ID')

# ----------------- #
`;


// Helper functions for code generation with masked credentials
const generateDisplayCode = (nodes: Node[], edges: Edge[]): string => {
  const generateBridgeForDisplay = (node: Node) => {
    const data = node.data;
    return `${data.variableName} = UserProxyAgent(
    name="${data.variableName}",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=1,
    code_execution_config={
        "work_dir": "dotbase-execution-dir",
        "use_docker": False,
    },
    system_message="I am a user proxy agent that helps with information gathering and research."
)`;
  };

  const generateHubForDisplay = (node: Node, connectedAgents: string[]) => {
    const data = node.data;
    return `${data.variableName} = autogen.GroupChat(
  agents=[${connectedAgents.join(',')}],  # All connected agents must be included here
  messages=[],
  max_round=${data.maxRounds || 15},
  speaker_selection_method="${data.agentSelection || 'round_robin'}"
)
${data.variableName}_manager = autogen.GroupChatManager(
  groupchat=${data.variableName},
  llm_config={
      "config_list": [{
          "model":"${data.selectedModel || OAIModelsEnum.GPT_4o}",
          "api_key": "YOUR_OPENAI_API_KEY"  #Placeholder for API key
      }]
  }
)`;
  };

  const generateNexusForDisplay = (node: Node) => {
    const data = node.data;
    let code = `${data.variableName} = autogen.AssistantAgent(
    name="${data.variableName}",`;
    
    if (data.systemPrompt) {
      code += `\n    system_message="${data.systemPrompt}",`;
    }
    
    code += `\n    description="I am an AI assistant that helps with research and provides detailed information and if given system_message I work accordingly.",
    llm_config={
        "config_list": [{
            "model":"${data.selectedModel || OAIModelsEnum.GPT_4o}",
            "api_key": "YOUR_OPENAI_API_KEY"  #Placeholder for API key
        }]
    }
)`;
    return code;
  };

  const generateLuminaForDisplay = (node: Node) => {
    const data = node.data;
    return `${data.variableName} = GPTAssistantAgent(
    name="${data.variableName}",
    description="I am an AI assistant that helps with research and provides detailed information.",
    llm_config={
        "config_list": [{
            "model":"${data.selectedModel || OAIModelsEnum.GPT_4o}",
            "api_key": "YOUR_OPENAI_API_KEY"  #Placeholder for API key
        }],
        "assistant_id": "YOUR_ASSISTANT_ID"   #Placeholder for assistant ID, check: https://platform.openai.com/assistants
    }
)`;
  };

  // Rest of the display code generation logic remains the same
  const generateSpark = (node: Node) => {
    const data = node.data;
    return data.func || '';
  };

  const generateInitiateChat = (sourceNode: Node, targetNode: Node) => {
    return `${sourceNode.data.variableName}.initiate_chat(${targetNode.data.variableName}_manager, message="${sourceNode.data.initialPrompt}")`;
  };

  // Combine all code blocks
  let code = generateImports();
  const codeBlocks: string[] = [];
  const initiateChatBlocks: string[] = [];

  // Generate Spark functions first
  nodes.forEach(node => {
    if (node.type === DotbaseNodesEnum.SPARK) {
      const funcCode = generateSpark(node);
      if (funcCode) {
        codeBlocks.push(funcCode);
      }
    }
  });

  // Generate agent code
  nodes.forEach(node => {
    let agentCode = '';
    switch (node.type) {
      case DotbaseNodesEnum.BRIDGE:
        agentCode = generateBridgeForDisplay(node);
        break;
      case DotbaseNodesEnum.NEXUS:
        agentCode = generateNexusForDisplay(node);
        break;
      case DotbaseNodesEnum.LUMINA:
        agentCode = generateLuminaForDisplay(node);
        break;
    }
    if (agentCode) {
      codeBlocks.push(agentCode);
    }
  });

  // Generate Hub code
  nodes.forEach(node => {
    if (node.type === DotbaseNodesEnum.HUB) {
      const connectedAgents = edges
        .filter(edge => edge.target === node.id)
        .map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          return sourceNode?.data.variableName;
        })
        .filter(Boolean);
      
      if (connectedAgents.length > 0) {
        codeBlocks.push(generateHubForDisplay(node, connectedAgents));
      }
    }
  });

  // Generate chat initiation code
  edges.forEach(edge => {
    const sourceNode = nodes.find(node => node.id === edge.source);
    const targetNode = nodes.find(node => node.id === edge.target);
    
    if (sourceNode?.type === DotbaseNodesEnum.BRIDGE && 
        targetNode?.type === DotbaseNodesEnum.HUB) {
      initiateChatBlocks.push(generateInitiateChat(sourceNode, targetNode));
    }
  });

  return code + codeBlocks.join('\n\n') + '\n\n' + initiateChatBlocks.join('\n');
};


// Helper functions for code generation with real credentials
const generateExecutionCode = (nodes: Node[], edges: Edge[]): string => {
  const generateBridgeForDisplay = (node: Node) => {
    const data = node.data;
    return `${data.variableName} = UserProxyAgent(
    name="${data.variableName}",
    human_input_mode="ALWAYS",
    max_consecutive_auto_reply=1,
    code_execution_config={
        "work_dir": "dotbase-execution-dir",
        "use_docker": False,
    },
    system_message="I am a user proxy agent that helps with information gathering and research."
)`;
  };

  const generateHubForDisplay = (node: Node, connectedAgents: string[]) => {
    const data = node.data;
    return `${data.variableName} = autogen.GroupChat(
  agents=[${connectedAgents.join(',')}],  # All connected agents must be included here
  messages=[],
  max_round=${connectedAgents.length}, 
  speaker_selection_method="${data.agentSelection || 'round_robin'}"
)
${data.variableName}_manager = autogen.GroupChatManager(
  groupchat=${data.variableName},
  llm_config={
      "config_list": [{
          "model":"${data.selectedModel || OAIModelsEnum.GPT_4o}",
          "api_key": OPENAI_API_KEY
      }]
  }
)`;
  };

  const generateNexusForDisplay = (node: Node) => {
    const data = node.data;
    let code = `${data.variableName} = autogen.AssistantAgent(
    name="${data.variableName}",`;
    
    if (data.systemPrompt) {
      code += `\n    system_message="${data.systemPrompt}",`;
    }
    
    code += `\n    description="I am an AI assistant that helps with research and provides detailed information and if given system_message I work accordingly.",
    llm_config={
        "config_list": [{
            "model":"${data.selectedModel || OAIModelsEnum.GPT_4o}",
            "api_key": OPENAI_API_KEY 
        }]
    }
)`;
    return code;
  };

  const generateLuminaForDisplay = (node: Node) => {
    const data = node.data;
    return `${data.variableName} = GPTAssistantAgent(
    name="${data.variableName}",
    description="I am an AI assistant that helps with research and provides detailed information.",
    llm_config={
        "config_list": [{
            "model":"${data.selectedModel || OAIModelsEnum.GPT_4o}",
            "api_key": OPENAI_API_KEY
        }],
        "assistant_id": OPENAI_ASSISTANT_ID  
    }
)`;
  };

  // Rest of the display code generation logic remains the same
  const generateSpark = (node: Node) => {
    const data = node.data;
    return data.func || '';
  };

  const generateInitiateChat = (sourceNode: Node, targetNode: Node) => {
    return `${sourceNode.data.variableName}.initiate_chat(${targetNode.data.variableName}_manager, message="${sourceNode.data.initialPrompt}")`;
  };

  // Combine all code blocks
  let code = generateImports();
  const codeBlocks: string[] = [];
  const initiateChatBlocks: string[] = [];

  // Generate Spark functions first
  nodes.forEach(node => {
    if (node.type === DotbaseNodesEnum.SPARK) {
      const funcCode = generateSpark(node);
      if (funcCode) {
        codeBlocks.push(funcCode);
      }
    }
  });

  // Generate agent code
  nodes.forEach(node => {
    let agentCode = '';
    switch (node.type) {
      case DotbaseNodesEnum.BRIDGE:
        agentCode = generateBridgeForDisplay(node);
        break;
      case DotbaseNodesEnum.NEXUS:
        agentCode = generateNexusForDisplay(node);
        break;
      case DotbaseNodesEnum.LUMINA:
        agentCode = generateLuminaForDisplay(node);
        break;
    }
    if (agentCode) {
      codeBlocks.push(agentCode);
    }
  });

  // Generate Hub code
  nodes.forEach(node => {
    if (node.type === DotbaseNodesEnum.HUB) {
      const connectedAgents = edges
        .filter(edge => edge.target === node.id)
        .map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          return sourceNode?.data.variableName;
        })
        .filter(Boolean);
      
      if (connectedAgents.length > 0) {
        codeBlocks.push(generateHubForDisplay(node, connectedAgents));
      }
    }
  });

  // Generate chat initiation code
  edges.forEach(edge => {
    const sourceNode = nodes.find(node => node.id === edge.source);
    const targetNode = nodes.find(node => node.id === edge.target);
    
    if (sourceNode?.type === DotbaseNodesEnum.BRIDGE && 
        targetNode?.type === DotbaseNodesEnum.HUB) {
      initiateChatBlocks.push(generateInitiateChat(sourceNode, targetNode));
    }
  });

  return code + codeBlocks.join('\n\n') + '\n\n' + initiateChatBlocks.join('\n');
};

export { generateDisplayCode, generateExecutionCode };
