import React from 'react';

type TreeNodeProps = {
  name: string;
  content: React.JSX.Element;
};
const NodeSkeleton: React.FC<TreeNodeProps> = ({ name, content }: TreeNodeProps) => {
  return (
    <div className="bg-[#0a1a2f] border border-black-200 rounded-sm min-w-60">
      <div className="bg-[#1a1a1a] border-b border-b-black-200">
        <p className="px-2 py-1 font-bold text text-white">{name}</p>
      </div>
      <div className="bg-[#1a1a1a] p-2 text-white">{content}</div>
    </div>
  );
};
export default NodeSkeleton;
