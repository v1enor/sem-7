import React from "react";
import LeftMenu from '../LeftMenu/LeftMenu';
import ProjectContent from '../ProjectsContent/ProjectContent';
import { getProjects } from '../../services/apiProjects'; // Импортируйте вашу функцию для получения проектов

const ProjectsPage = () => {

    return (
        <div style={{ display: 'flex' }}>
            <LeftMenu />
            <ProjectContent />
        </div>
    );
}

export default ProjectsPage;