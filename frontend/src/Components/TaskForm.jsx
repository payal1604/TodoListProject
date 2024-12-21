import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../Actions/taskActions";

const TaskForm = ({ initialTask = null, onClose }) => {
  const [task, setTask] = useState({
    name: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialTask) {
      setTask({
        ...initialTask,
        dueDate: new Date(initialTask.dueDate).toISOString().split("T")[0],
      });
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialTask) {
      dispatch(updateTask(initialTask._id, task));
    } else {
      dispatch(addTask(task));
    }
    setTask({ name: "", priority: "Medium", dueDate: "", status: "Pending" });
    if (onClose) onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gray-200 p-6 rounded shadow-md mx-auto w-full sm:w-1/2 lg:w-3/4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Task Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Priority</label>
        <select
          className="w-full p-2 border rounded"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Due Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />
      </div>
      <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded">
        {initialTask ? "Update Task" : "Add Task"}
      </button>
      {onClose && (
        <button
          type="button"
          className="ml-4 sm:ml-1 w-full sm:w-auto bg-gray-400 text-white px-4 py-2 rounded mt-4 sm:mt-0"
          onClick={onClose}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
