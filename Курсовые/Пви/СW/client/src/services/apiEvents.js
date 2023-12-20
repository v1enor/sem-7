const API_URL = 'http://localhost:3001';



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
}