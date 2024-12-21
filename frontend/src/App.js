import React from "react";
import { Provider } from "react-redux";
import store from "./Store/store";
import TaskList from "./Components/TaskList";

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl text-red-300 sm:text-4xl lg:text-5xl font-bold text-center mb-2 mt-3">
            To-Do List App
          </h1>
          <TaskList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
