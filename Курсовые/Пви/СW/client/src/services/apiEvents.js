const API_URL =  process.env.REACT_APP_SERVER_URL;



export function getEvents() {
    return fetch(`${API_URL}/event/my`, {
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

export function updateEvent(event) {
    return fetch(`${API_URL}/event/update/${event._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
        body: JSON.stringify(event)
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

export function createEvent(event) {
    return fetch(`${API_URL}/event/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(event)
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
<<<<<<< HEAD
=======
}


export function archiveEvent(event) {
    return fetch(`${API_URL}/event/archive/${event._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(event)
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

export function activeEvent(event) {
    return fetch(`${API_URL}/event/active/${event._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(event)
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
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
}