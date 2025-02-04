import FieldSchema, { InputField } from '@/components/dashboard/nodes/common/Fields';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/dashboard/nodes/common/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { DotbaseNodesEnum } from '../types/nodeTypes';

const Bridge: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { updateNode } = useDnDStore();
  const { getNode } = useReactFlow();
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const data = getNode(props.id)?.data;
  const onVarNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      updateNode(props.id, { variableName: val });
    },
    [updateNode, props.id],
  );
  const onPromptChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      updateNode(props.id, { initialPrompt: val });
    },
    [updateNode, props.id],
  );

  return (
    <div className="rounded-sm bg-slate-500/10 text-white w-[266px] border-none">
      <div className={`${DotbaseNodesEnum.BRIDGE} flex justify-between items-center py-2`}>
        <div className="font-bold ml-2">BRIDGE</div>
        <InformationCircleIcon
          width={20}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="Bridge" />}
            content={
              <DefaultContent
                name="Bridge"
                description="is a proxy agent for the user, that can execute
                code and provide feedback to the other agents. By default, the agent will prompt for human input every
                time a message is received. Code execution is enabled by default. LLM-based auto reply is disabled by default."
                docTeaser="Agent Name: Name of the agent."
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="pb-2 px-2 bg-slate-500/10 text-sm">
        <FieldSchema
          field={
            <InputField
              label="Agent Name"
              required
              onChange={onVarNameChange}
              value={data?.variableName}
              type="text"
              placeholder="dotbase_agent"
            />
          }
          errors={errors?.[props.id]?.variableName}
        />
        <FieldSchema
          field={
            <InputField
              label="Initial Prompt"
              placeholder="Do a research about how..."
              required
              onChange={onPromptChange}
              value={data?.initialPrompt}
              type="text"
            />
          }
          errors={errors?.[props.id]?.initialPrompt}
        />
      </div>

      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default Bridge;
