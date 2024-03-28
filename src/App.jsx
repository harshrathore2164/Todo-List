import { useState } from "react";
import { MdSunny, MdDarkMode } from "react-icons/md";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, title) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const getRemainingTasks = () => tasks.filter((task) => !task.completed);
  return (
    <>
      <div
        className={`hero ${
          darkTheme ? "bg-gray-900" : "bg-gray-100"
        } h-screen w-full flex flex-col items-center m-auto my-14`}
      >
        <div
          className={`flex flex-col space-y-6 w-[600px] z-10 p-4 ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          <div className="w-full flex items-center justify-between">
            <h1 className="uppercase text-4xl font-bold text-white tracking-widest mb-4">
              My Task
            </h1>
            {darkTheme ? (
              <MdSunny
                onClick={toggleTheme}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg bottom-5 right-5 ${
                  darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            ) : (
              <MdDarkMode
                onClick={toggleTheme}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg bottom-5 right-5 ${
                  darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            )}
          </div>
          <div className="shadow-md">
            <AddTaskForm darkTheme={darkTheme} onAddTask={addTask} />
          </div>
          <div
            className={`scroll ${
              darkTheme ? "bg-gray-800" : "bg-white"
            } w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-lg 
          shadow-lg relative transition-all duration-500`}
          >
            <div
              className={`w-full overflow-hidden sticky top-0 ${
                darkTheme ? "bg-gray-800" : "bg-white"
              }
            flex items-center justify-between text-gray-500 border-b`}
            >
              <p className="text-gray-500 px-2 py-3">
                {getRemainingTasks().length} task left
              </p>
              <button onClick={clearTasks}>Clear All Tasks</button>
            </div>

            {tasks.length ? (
              <TaskList
                tasks={tasks}
                onEditTask={editTask}
                onDeleteTask={deleteTask}
                onToggleCompleted={toggleCompleted}
              />
            ) : (
              <div className="w-full h-[80%] flex items-center justify-center overflow-hiddent">
                <p className="text-gray-500 text-center">Empty Task</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
