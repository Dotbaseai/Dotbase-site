import FieldSchema, { SelectField , InputField  } from '@/components/dashboard/nodes/common/Fields';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/dashboard/nodes/common/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { OAIModelsEnum } from '@/utils/enum';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { DotbaseNodesEnum } from '../types/nodeTypes';

const Lumina: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { updateNode } = useDnDStore();
  const { getNode } = useReactFlow();

  const data = getNode(props.id)?.data;
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const onAgentNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      updateNode(props.id, { variableName: val });
    },
    [updateNode, props.id],
  );
  // const onOAIIdChange = React.useCallback(
  //   (evt: React.ChangeEvent<HTMLInputElement>) => {
  //     const val = evt.target.value.trim();
  //     updateNode(props.id, { OAIId: val });
  //   },
  //   [updateNode, props.id],
  // );

  return (
    <div className="rounded-sm bg-slate-500/10 text-white w-[240px] border-none">
      <div
        className={`${DotbaseNodesEnum.LUMINA} flex justify-between items-center py-2`}
      >
        <div className="font-bold ml-2">LUMINA</div>
        <InformationCircleIcon
          width={20}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="Lumina" />}
            content={
              <DefaultContent
                name="Lumina"
                description="is an agent that leverages the OpenAI Assistant API for conversational capabilities."
                docTeaser={`LLM: Any large language model provided by OpenAI for the agent to consume.`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="pb-2 px-2 bg-slate-500/10 text-sm">
        {/* <FieldSchema
          field={
            <InputField
              label="Agent Name"
              required
              onChange={onAgentNameChange}
              value={data?.variableName}
              type="text"
              placeholder="my_agent"
            />
          }
          errors={errors?.[props.id]?.variableName}
        /> */}
        {/* <FieldSchema
          field={
            <InputField
              label="OpenAI ID"
              required
              onChange={onOAIIdChange}
              value={data?.OAIId}
              type="text"
              placeholder="asst-****"
            />
          }
          errors={errors?.[props.id]?.OAIId}
        /> */}
         <FieldSchema
          field={
            <InputField
              label="Agent Name"
              required
              onChange={onAgentNameChange}
              value={data?.variableName}
              type="text"
              placeholder="gpt_agent"
            />
          }
          errors={errors?.[props.id]?.variableName}
        />
        <FieldSchema
          field={
            <SelectField
              label="LLM"
              selected={data?.selectedModel || OAIModelsEnum.GPT_4o}
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

export default Lumina;
