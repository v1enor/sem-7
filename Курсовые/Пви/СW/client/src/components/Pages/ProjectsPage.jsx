import React from "react";
import LeftMenu from '../LeftMenu/LeftMenu';
import ProjectContent from '../ProjectsContent/ProjectContent';

const ProjectsPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <LeftMenu />
            <ProjectContent />
        </div>
    );
}

export default ProjectsPage;