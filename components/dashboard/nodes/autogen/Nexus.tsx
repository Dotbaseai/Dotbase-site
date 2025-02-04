import FieldSchema, { InputField, SelectField } from '@/components/dashboard/nodes/common/Fields';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/dashboard/nodes/common/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { OAIModelsEnum } from '@/utils/enum';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { DotbaseNodesEnum } from '../types/nodeTypes';

const Nexus: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { updateNode } = useDnDStore();
  const { getNode } = useReactFlow();

  const data = getNode(props.id)?.data;
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const onAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    updateNode(props.id, { variableName: val });
  };

  const onSystemPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateNode(props.id, { systemPrompt: val });
  };

  return (
    <div className="rounded-sm bg-slate-500/10 text-white w-[280px] border-none">
      <div
        className={`${DotbaseNodesEnum.NEXUS} flex justify-between items-center border-b border-gray-200 py-2`}
      >
        <div className="font-bold ml-2">NEXUS</div>
        <InformationCircleIcon
          width={20}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="Nexus" />}
            content={
              <DefaultContent
                name="Nexus"
                description="is a subclass of ConversableAgent configured with a default system message. The default system message is designed to solve a task with LLM, including suggesting python code blocks and debugging."
                docTeaser={`Agent Name: Name of the agent. (ex: my_nexus_1)\n\nSystem Message: A message for the ChatCompletion inference. LLM: Any large language model provided by OpenAI for the agent to consume.`}
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
              placeholder="my_agent"
              required
              onChange={onAgentNameChange}
              type="text"
              value={data?.variableName}
            />
          }
          errors={errors?.[props.id]?.variableName}
        />
        <FieldSchema
          field={
            <InputField
              label="System Message"
              onChange={onSystemPromptChange}
              type="text"
              value={data?.systemPrompt}
              placeholder='solve task xyz with LLM"'
            />
          }
          errors={errors?.[props.id]?.systemPrompt}
        />
        <FieldSchema
          field={
            <SelectField
              label="LLM"
              selected={data?.selectedModel || OAIModelsEnum.GPT_3_5_TURBO}
              onChange={(e) => updateNode(props.id, { selectedModel: e.target.value })}
              options={Object.values(OAIModelsEnum)}
            />
          }
          errors={errors?.[props.id]?.selectedModel}
        />
      </div>
      
      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16" />
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default Nexus;
