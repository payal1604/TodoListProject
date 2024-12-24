import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTasks,
  deleteTask,
  updateTask,
  sendReminder,
} from "../Actions/taskActions";
import TaskTimeline from "./TaskTimeline";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const dispatch = useDispatch();
  const [editTask, setEditTask] = useState(null);
  const { tasks } = useSelector((state) => state.tasks);

  // console.log("tasks", tasks);
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const changeStatus = (task) => {
    const updateStatus = task.status === "Pending" ? "Completed" : "Pending";
    dispatch(updateTask(task._id, { ...task, status: updateStatus }));
  };

  const handleSendReminder = (id) => {
    dispatch(sendReminder(id));
  };

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 py-6">
      <TaskForm
        initialTask={editTask}
        onClose={() => setEditTask(null)}
        onSubmit={() => setEditTask(null)}
      />

      {tasks.length > 0 &&
        tasks.map((task) => (
          <div
            key={task._id}
            className="mt-4 bg-gray-200 p-4 mb-4 rounded shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-indigo-500">
                  Task Name: {task.name}
                </h3>
                <p className="text-lg">Priority:{task.priority}</p>
                <p className="text-lg">
                  Due Date:{new Date(task.dueDate).toLocaleDateString()}
                </p>
                <p className="text-lg">Status:{task.status}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 ">
                <button
                  className="w-40 h-12 bg-green-500 text-white px-2 py-2 rounded "
                  onClick={() => changeStatus(task)}
                >
                  {task.status === "Pending"
                    ? "Mark as Pending"
                    : "Mark as Completed"}
                </button>
                <button
                  className="w-32 h-12 bg-blue-500 text-white px-2 py-2 rounded"
                  onClick={() => {
                    setEditTask(task);
                  }}
                >
                  Edit
                </button>
                <button
                  className="w-32 h-12 bg-red-500 text-white px-2 py-2 rounded-md"
                  onClick={() => dispatch(deleteTask(task._id))}
                >
                  Delete
                </button>
                {!task.reminderSent && (
                  <button
                    className="w-40 h-12  bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500"
                    onClick={() => handleSendReminder(task._id)}
                  >
                    Send Reminder
                  </button>
                )}
              </div>
            </div>
            {/* <TaskTimeline timeline={task.timeline} /> */}
          </div>
        ))}
    </div>
  );
};

export default TaskList;
