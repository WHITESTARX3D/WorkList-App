import React, { memo } from 'react';

function Task(props) {
  return (
    <div className="border-2 border-red-600 h-20 w-80 flex justify-between items-center p-2 rounded-md">
      <p>{props.task}</p> 
       <div className="flex flex-col gap-3">
      <button className="bg-green-700 h-6 w-6 rounded-sm text-white">edit</button>
      <button className="bg-red-700 h-6 w-6 rounded-sm text-white font-[1000]">x</button>
      </div>
    </div>
  );
}

export default memo(Task);