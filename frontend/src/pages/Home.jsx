import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiAddLargeFill } from "react-icons/ri";
import Background from "../components/Background";
import Header from "../components/Header";
import Cards from "../components/Cards";

const Home = () => {
  const navigate = useNavigate();
  console.log("Home Component Rendered");

  const [projects, setProjects] = useState([]);

  const updateProjects = (deletedProjectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== deletedProjectId)
    );
  };

  const createHandler = async () => {
    let res = await axios.get("https://dovault-task-tracker.onrender.com/api/projects/createPage");
    console.log("Data ka Response", res.data);
    navigate("/create", { state: res.data });
  };

  useEffect(() => {
    const details = async () => {
      let res = await axios.get("https://dovault-task-tracker.onrender.com/api/tasks/projectDetail");
      setProjects(res.data);
      console.log(res.data);
    };
    details();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await axios.get("https://dovault-task-tracker.onrender.com/api/users/home");
      if (res.data.error) {
        navigate("/login");
      }
    })();
  }, []);

  return (
    <div className="w-full h-screen relative bg-white">
      <Background />
      <div className="fixed z-[3] top-0 left-0 w-full h-screen">
        <Header />
        <div className="flex items-center justify-between p-5 h-18">
          <h1 className="tracking-tighter text-3xl font-semibold m-2">
            Your Projects
          </h1>
          <button
            className="bg-transparent rounded mr-3 p-3 font-semibold text-xl flex gap-1 items-center tracking-tighter"
            onClick={createHandler}
          >
            <RiAddLargeFill /> Create Project
          </button>
        </div>
        <div className="flex flex-wrap">
          {projects.length === 0 ? (
            <h1 className="ml-7 tracking-tighter text-zinc-600">
              You Don't Have Projects Yet.
            </h1>
          ) : (
            projects.map((project) => (
              <Cards
                key={project._id}
                project={project}
                updateProjects={updateProjects}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
