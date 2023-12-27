import React, { useState, useEffect } from "react";
import "./Main.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

const Main = () => {
  // useState
  const [nightMode, setNightMode] = useState(false);

  // animation aos
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // toggling between night mode and light mode
  useEffect(() => {
    const mainContainer = document.body;
    if (nightMode) {
      mainContainer.classList.add("night_mode");
      console.log("add");
    } else {
      mainContainer.classList.remove("night_mode");
      console.log("remove");
    }
  },[nightMode]);

  // toaster
  const showSucessMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showFailedMessage = () => {
    toast.error("Please Provide Value !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showDeletedMessage = () => {
    toast.warning("Item Deleted !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // save data on local storage----------------------------->
  let saveDataOnLocalStorage = (updateTask) => {
    localStorage.setItem("localStoreData", JSON.stringify(updateTask));
  };

  useEffect(() => {
    let savedTask = JSON.parse(localStorage.getItem("localStoreData"));
    if (savedTask) {
      setAddTask(savedTask);
    }
  }, []);

  // take user type input------------------------------------>
  let [taskText, setTaskText] = useState("");
  function onChageTaskText(e) {
    setTaskText(e.target.value);
  }

  // click on add item button----------------->
  let [addTask, setAddTask] = useState([]);
  function onClickAddItem() {
    if (taskText.trim() != "") {
      let newAddTask = [...addTask, { text: taskText, completed: false }];
      setAddTask(newAddTask);
      saveDataOnLocalStorage(newAddTask);
      setTaskText("");
      showSucessMessage();
    } else {
      showFailedMessage();
    }
  }
  // remove task from task list click on delet button-------------------------------------------------->
  function onClickRemoveTask(index) {
    let updatedTask = [...addTask];
    let filterTaskList = updatedTask.filter((task, taskIdx) => {
      return index != taskIdx;
    });
    saveDataOnLocalStorage(filterTaskList);
    setAddTask(filterTaskList);
    showDeletedMessage();
  }

  // give line through in completed task------------------------------------------------------->
  function onChangeTaskCompletion(index) {
    let updatedTask = addTask.map((task, taskIdx) =>
      index == taskIdx ? { ...task, completed: !task.completed } : task
    );
    setAddTask(updatedTask);
    saveDataOnLocalStorage(updatedTask);
  }

  // toggle night mode
  function toggleNightMode() {
    setNightMode((preMode) => !preMode);
  }
  

  return (
    <div className="main">
      {/* header */}
      <header className="main_header">
        <h1>Grocery Bud</h1>
        {/* toggole switch */}
        <label class="switch">
          <input
            type="checkbox"
            checked={nightMode}
            onChange={toggleNightMode}
          />
          <span class="slider round"></span>
        </label>
      </header>
      {/* todo task container */}
      <div className="main_container" data-aos="zoom-out">
        <h1 className="main_heading">Add Your Day to Day Task here !</h1>

        {/* add item input and button */}
        <div className="main_add_item">
          <input type="text" onChange={onChageTaskText} value={taskText} />
          <button onClick={onClickAddItem}>Add Item</button>
        </div>

        {/* show task div */}
        <ul>
          {addTask.map((item, index) => (
            <li className="main_task" key={index}>
              <div className="main_content">
                <input
                  type="checkbox"
                  onChange={() => onChangeTaskCompletion(index)}
                  checked={item.completed}
                />
                <label
                  className="task_para"
                  style={{
                    textDecoration:
                      item.completed == true ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </label>
              </div>
              <button onClick={() => onClickRemoveTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Main;
