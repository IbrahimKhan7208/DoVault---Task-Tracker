import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cards = ({ project, updateProjects }) => {
  const [projectData, setProjectData] = useState(project);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const addTaskHandler = async () => {
    navigate("/task", { state: project });
  };

  const deleteProjectHandler = async () => {
    try {
      if (confirm("Do you want delete this Project?") == true) {
        await axios.post(`/api/projects/deleteProject/${project._id}`, { withCredentials: true });
        updateProjects(project._id);
        navigate("/home");
        }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="p-4 bg-transparent">
      <div className="h-fit w-[300px] rounded-xl bg-[#e3ccbd] m-2 pt-3 pb-1 pr-4 pl-4 border-2 border-black shadow-2xl">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tighter ml-5 mr-5">
              {project.title}
            </h1>
            <button onClick={() => setExpanded(!expanded)} className="text-3xl">
              {expanded ? <MdExpandLess /> : <MdExpandMore />}
            </button>
          </div>
          <h1 className="text-lg  tracking-tighter ml-2 mr-2 ">
            {project.description}
          </h1>
        </div>
        {expanded && (
          <>
            <hr className="border-1 border-[#683c21] mt-1" />
            {projectData.tasks?.map((task) => (
              <div key={task._id} className="m-2 mb-4 p-2 rounded bg-[#b79681] shadow-xl">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg tracking-tighter">{task.taskTitle}</h1>
                  <h1 className={`p-1 rounded-lg font-semibold ${task.status === "Pending" ? 'bg-amber-100' : 'bg-green-100'}`}>
                    {task.status}
                  </h1>
                </div>
                <h1>{task.taskDescription}</h1>
                <div className="flex items-center justify-evenly">
                  <button className="text-lg tracking-tighter text-sky-200" onClick={async () => {
                    if (confirm("Have you Completed the Task?") == true) {
                      const res = await axios.post(`/api/tasks/updateTask/${task._id}`);
                      const updatedTask = res.data;
                      setProjectData((prev) => ({
                        ...prev,
                        tasks: prev.tasks.map((t) =>
                          t._id === updatedTask._id ? updatedTask : t
                        ),
                      }));
                    }
                  }}>update</button>
                  <button className="text-lg tracking-tighter text-red-300" onClick={async () => {
                    if (confirm("Do you want delete this Task?") == true) {
                      await axios.post(`/api/tasks/deleteTask/${task._id}`);
                      setProjectData((prev) => ({
                        ...prev,
                        tasks: prev.tasks.filter((t) => t._id !== task._id),
                      }));
                    }
                  }}>delete</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center p-2">
              <button className="text-xl font-semibold tracking-tighter text-zinc-500 underline m-2" onClick={addTaskHandler}>add task</button>
              <button className="text-xl font-semibold tracking-tighter text-red-400 underline m-2" onClick={deleteProjectHandler}>delete project</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;
