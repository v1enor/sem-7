import React, { useState, useEffect } from "react";
import "./TeamCreate.css";
import TeamRow from "./TeamRow";
import { getTeams } from '../../services/apiTeams'; // Импортируйте вашу функцию для получения проектов
import AlertProject from '../Alert/AlertProject';
import { createProject } from '../../services/apiProjects';
const TeamContent = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загрузите данные проектов при первом рендере
        getTeams()
            .then(data => {
                setTeams(data);
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
                
                <h2>Команды</h2>
               
            </div>
            <div id="ProjectContent">
                {teams.map(team => <TeamRow key={team._id} team={team} />)}
            </div>
        </div>
    );
};

export default TeamContent;