const API_URL = 'http://localhost:3001';

export function getTask() {
    return fetch(`${API_URL}/task/my`, {
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

export function setTaskMy(task) {
    return fetch(`${API_URL}/task/update/${task._id}`, {
        method: 'PUT',
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