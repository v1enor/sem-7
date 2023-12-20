import React, { useState, useEffect } from "react";
import "./TeamCreate.css";
import TeamRow from "./TeamRow";
import { getTeams, imemberTeam } from '../../services/apiTeams'; // Импортируйте вашу функцию для получения проектов
import AlertTeam from '../Alert/AlertTeam';
import { createProject } from '../../services/apiProjects';
const TeamContent = () => {
    const [teams, setTeams] = useState([]);
    const [memberteams, setMemberTeams] = useState([]); // [
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загрузите данные проектов при первом рендере
        imemberTeam()
            .then(data => {
                setMemberTeams(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

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
        return <div>Загрузка...</div>;
    }

    return (
        <div style={{display:"flex", width:"100%",flexDirection: "column"}} id="ProjectPage">
            <div style={{display:"flex", width:"100%",}}>
                <h2>Команды</h2>
                <AlertTeam updateProjects={setTeams} />
            </div>
            {teams.length > 0 && <div id="ProjectContent">
                <h2>Мои команды где я капитан</h2>
                {teams.map(team => <TeamRow key={team._id} team={team} readOnly={false}/>)}
            </div>}
            {memberteams.length > 0 &&
                <div id="ProjectContent" >
                <h2>Мои команды куда меня я участник</h2>
                {memberteams.map(team => <TeamRow key={team._id} team={team}  readOnly={true}/>)}
            </div>}
        </div>
    );
};

export default TeamContent;