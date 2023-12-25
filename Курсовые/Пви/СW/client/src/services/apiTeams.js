const API_URL =  process.env.REACT_APP_SERVER_URL;

export function getTeams() {
    return fetch(`${API_URL}/team/my`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`},

    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .catch(error => {
        // Handle any errors
        throw new Error(error.message);
        });
    
    }

export function updateTeam(team) {
    return fetch(`${API_URL}/team/update/${team._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
        body: JSON.stringify(team)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.message);
        }

        return response.json();
    })
    .catch(error => {
        // Handle any errors
        throw new Error(error.message);
    });
}

export function imemberTeam(team) {
    return fetch(`${API_URL}/team/imember`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            // Handle any errors
            throw new Error(error.message);
        });
};


export function createTeam(team) {
    return fetch(`${API_URL}/team/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
        body: JSON.stringify(team)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.message);
        }

        return response.json();
    })
    .catch(error => {
        // Handle any errors
        throw new Error(error.message);
    });
}

export function setstatus(team) {
    return fetch(`${API_URL}/team/unavailable`, 
        {   method: 'POST',
        headers: { 'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
        body: JSON.stringify(team)
        }).then(response => {
        if (!response.ok) {
            throw new Error(response.message);
        }
        return response.json();
        })
        .catch(error => {
            throw new Error(error.message);
        });
}