import { DotbaseNodesEnum } from '@/components/dashboard/nodes/types/nodeTypes';
import { DefaultContent, MethodHeaderSkeleton, ToolbarSkeleton } from '@/components/dashboard/nodes/common/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps } from 'reactflow';

import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import Editor from 'react-simple-code-editor';

const Spark: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { updateNode } = useDnDStore();
  const [toolbarVisible, setToolbarVisible] = React.useState(false);
  const [code, setCode] = React.useState('');

  const onCustomFuncChange = (code: string) => {
    updateNode(props.id, { func: code });
    setCode(code);
  };

  return (
    <div className="nowheel rounded-sm bg-slate-500/10 text-white w-[266px] border-none">
      <div
        className={`${DotbaseNodesEnum.SPARK} flex justify-between items-center py-2`}
      >
        <div className="font-bold ml-2">SPARK</div>
        <InformationCircleIcon
          width={20}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<MethodHeaderSkeleton name="Spark" />}
            content={
              <DefaultContent
                name="Spark"
                description="is a method for your agents to consume when it's necessary."
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="pb-2 px-2 bg-slate-500/10 text-sm">
        <div className="flex justify-between items-center">
          <Editor
            value={code}
            onValueChange={onCustomFuncChange}
            placeholder="def my_action_cen(arg1, arg2):"
            highlight={(code) => highlight(code || '', languages.python!, 'py')}
            padding={10}
            className="max-w-96 max-h-96 min-h-16 overflow-y-auto bg-[#1a1a1a] text-gray-400 w-full rounded-sm mt-2"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
            textareaClassName="outline-none w-80"
          />
        </div>
        {errors?.[props.id]?.func && <span className="text-red-500 text-xs">{errors?.[props.id]?.func}</span>}
      </div>
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16 h-1" />
    </div>
  );
};

export default Spark;
