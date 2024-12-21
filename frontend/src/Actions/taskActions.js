import axios from "axios";
export const FETCH_TASKS = "FETCH_TASKS";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const getAllTasks = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:7000/api/tasks");
    dispatch({ type: FETCH_TASKS, payload: res.data });
  } catch (error) {
    console.log("Error in fetching data");
  }
};
export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:7000/api/tasks", task);
    dispatch({ type: ADD_TASK, payload: response.data });
    dispatch(getAllTasks());
  } catch (error) {
    console.error("Error in adding task", error);
  }
};
export const updateTask = (id, updates) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:7000/api/tasks/${id}`,
      updates
    );
    dispatch({ type: UPDATE_TASK, payload: response.data });
    dispatch(getAllTasks());
  } catch (error) {
    console.error("Error in updating task", error);
  }
};
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:7000/api/tasks/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.error("Error in deleting task", error);
  }
};
export const sendReminder = (id) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:7000/api/tasks/${id}/reminder`
    );
    console.log("id", id);
    const updatedTask = response.data;

    dispatch({
      type: "UPDATE_TASK",
      payload: updatedTask,
    });
  } catch (error) {
    console.error("Error sending reminder:", error);
  }
};
