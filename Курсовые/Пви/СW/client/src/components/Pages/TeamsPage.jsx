import React from "react";
import LeftMenu from '../LeftMenu/LeftMenu';
import TeamContent from '../TeamContent/TeamContent';

const TeamsPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <LeftMenu />
            <TeamContent />
        </div>
    );
}

export default TeamsPage;