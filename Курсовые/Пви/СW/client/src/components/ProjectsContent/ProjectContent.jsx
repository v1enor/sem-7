import React, { useState, useEffect } from "react";
import "./ProjectCreate.css";
import ProjectRow from "./ProjectRow";
import { getProjects } from '../../services/apiProjects'; // Импортируйте вашу функцию для получения проектов
import AlertProject from '../../components/Alert/AlertProject';
import { createProject } from '../../services/apiProjects';
const ProjectContent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загрузите данные проектов при первом рендере
        getProjects()
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{display:"flex", width:"100%",flexDirection: "column"}} id="ProjectPage">
            <div style={{display:"flex", width:"100%",}}>
                
                <h2>Проекты</h2>
                <AlertProject updateProjects={setProjects}/>
            </div>
            <div id="ProjectContent">
                {projects.map(project => <ProjectRow key={project._id} project={project} />)}
            </div>
        </div>
    );
};

export default ProjectContent;