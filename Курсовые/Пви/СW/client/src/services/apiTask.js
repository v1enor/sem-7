const API_URL =  process.env.REACT_APP_SERVER_URL;

export async function getTask() {
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
    
export async function getTaskByProjects() {
    return fetch(`${API_URL}/task/byproject`, {
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


export async function setTaskMy(task) {
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

export async function unsetTaskMy(task) {
    return fetch(`${API_URL}/task/unset/${task._id}`, {
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

export async function createTask(task) {
  return fetch(`${API_URL}/task/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.message);
      }

      return response.json();
    })
    .catch((error) => {
      // Handle any errors
      throw new Error(error.message);
    });
}

export async function updateTask(task) {
    return fetch(`${API_URL}/task/upload/${task._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.message);
        }
  
        return response.json();
      })
      .catch((error) => {
        // Handle any errors
        throw new Error(error.message);
      });
  }

export async function finishTask(task) {
    return fetch(`${API_URL}/task/finish/${task._id}`, {
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
 