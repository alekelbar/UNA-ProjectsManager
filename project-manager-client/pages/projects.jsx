import React from "react";
import Layout from "../components/Layout";

const Projects = () => {
  return (
    <Layout>
      <div className="w-4/5 mx-auto flex justify-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="spinner-border animate-ping inline-block w-12 h-12 border-4 rounded-full" role="status">
            <span className="visually-hidden">Building...</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;