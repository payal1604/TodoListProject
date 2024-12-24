import React from "react";

const TaskTimeline = ({ timeline }) => {
  if (!timeline || !Array.isArray(timeline) || timeline.length === 0) {
    return <p>No timeline available</p>;
  }
  return (
    <div className="mt-4">
      <h4 className="text-lg font-bold">Timeline</h4>
      <ul className="list-disc list-inside">
        {timeline.map((time, index) => (
          <li key={index}>
            {time.event +
              "  at " +
              new Date(time.timeStamp).toLocaleDateString() +
              " , " +
              new Date(time.timeStamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTimeline;
