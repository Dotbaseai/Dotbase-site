// components/dashboard/nodes/types/nodeTypes.ts
import Nexus from '@/components/dashboard/nodes/autogen/Nexus';
import Spark from '@/components/dashboard/nodes/autogen/Spark';
import Lumina from '@/components/dashboard/nodes/autogen/Lumina';
import Hub from '@/components/dashboard/nodes/autogen/Hub';
import Bridge from '@/components/dashboard/nodes/autogen/Bridge';
import React from 'react';
import { NodeProps, Node as ReactFlowNode } from 'reactflow';

// Enum defining all available node types
export enum DotbaseNodesEnum {
  BRIDGE = 'BRIDGE',
  HUB = 'HUB',
  LUMINA = 'LUMINA',
  SPARK = 'SPARK',
  NEXUS = 'NEXUS',
}

// Type definition for node data
export type DotbaseNodeDataType = {
  connectivity: {
    input: DotbaseNodesEnum[] | null;
    output: DotbaseNodesEnum[] | null;
  };
};

// Type definition for our custom node type
export type DotbaseNodeType = Omit<ReactFlowNode<DotbaseNodeDataType>, 'position'>;

// Default configuration for each node type
export const DOTBASE_NODES: { [k in DotbaseNodesEnum]: DotbaseNodeType } = {
  HUB: {
    id: DotbaseNodesEnum.HUB,
    type: DotbaseNodesEnum.HUB,
    dragHandle: `.${DotbaseNodesEnum.HUB}`,
    data: {
      connectivity: {
        input: [DotbaseNodesEnum.BRIDGE, DotbaseNodesEnum.LUMINA, DotbaseNodesEnum.NEXUS],
        output: null,
      },
    },
  },
  BRIDGE: {
    id: DotbaseNodesEnum.BRIDGE,
    type: DotbaseNodesEnum.BRIDGE,
    dragHandle: `.${DotbaseNodesEnum.BRIDGE}`,
    data: {
      connectivity: {
        input: null,
        output: [DotbaseNodesEnum.HUB],
      },
    },
  },
  LUMINA: {
    id: DotbaseNodesEnum.LUMINA,
    type: DotbaseNodesEnum.LUMINA,
    dragHandle: `.${DotbaseNodesEnum.LUMINA}`,
    data: {
      connectivity: {
        input: [DotbaseNodesEnum.SPARK],
        output: [DotbaseNodesEnum.HUB],
      },
    },
  },
  SPARK: {
    id: DotbaseNodesEnum.SPARK,
    type: DotbaseNodesEnum.SPARK,
    dragHandle: `.${DotbaseNodesEnum.SPARK}`,
    data: {
      connectivity: {
        input: null,
        output: [DotbaseNodesEnum.LUMINA],
      },
    },
  },
  NEXUS: {
    id: DotbaseNodesEnum.NEXUS,
    type: DotbaseNodesEnum.NEXUS,
    dragHandle: `.${DotbaseNodesEnum.NEXUS}`,
    data: {
      connectivity: {
        input: null,
        output: [DotbaseNodesEnum.HUB],
      },
    },
  },
};

// Map node types to their respective React components
export const CUSTOM_DOTBASE_NODES: { [_ in DotbaseNodesEnum]: React.ComponentType<NodeProps> } = {
  BRIDGE: Bridge,
  HUB: Hub,
  LUMINA: Lumina,
  SPARK: Spark,
  NEXUS: Nexus,
};