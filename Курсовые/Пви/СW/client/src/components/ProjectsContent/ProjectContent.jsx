import React, { useState, useEffect } from "react";
import "./ProjectCreate.css";
import ProjectRow from "./ProjectRow";
import { getProjects, imemberProject } from '../../services/apiProjects'; // Импортируйте вашу функцию для получения проектов
import AlertProject from '../../components/Alert/AlertProject';
import AlertTask from '../../components/Alert/AlertTask';

import { createProject } from '../../services/apiProjects';
const ProjectContent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [memberProject, setMemberProject] = useState([]);
    useEffect(() => {
        // Загрузите данные проектов при первом рендере
        imemberProject()
            .then(data => {
                setMemberProject(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

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
        <div  id="ProjectPage">
            <div id="ProjectTop">
                
                <h2>Проекты</h2>
                <AlertProject updateProjects={setProjects} />
                <AlertTask projects={projects} />
            </div>
            {projects.length > 0 &&
                <div id="ProjectContent">
                <h2>Ну в них я решаю</h2>
                    {projects.map(project => <ProjectRow key={project._id} project={project} readonly={false} />)}
            </div>
            }

            {memberProject.length > 0 &&
                <div id="ProjectContent">
                    <h2>Мои команды куда меня я участник</h2>
                    {memberProject.map(project => <ProjectRow key={project._id} project={project} readonly={true} />)}
                </div>
            }
        </div>
    );
};

export default ProjectContent;