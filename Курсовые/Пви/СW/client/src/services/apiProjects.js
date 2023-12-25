const API_URL = process.env.REACT_APP_SERVER_URL;

export async function getProjects() {
  return fetch(`${API_URL}/project/manager`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      // Handle any errors
      throw new Error(error.message);
    });
}

export function updateProject(project) {
  return fetch(`${API_URL}/project/update/${project._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(project),
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

export function createProject(project) {
  return fetch(`${API_URL}/project/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(project),
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

export function completeProject(project) {
  return fetch(`${API_URL}/project/complete/${project}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
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

export function imemberProject(team) {
  return fetch(`${API_URL}/project/user`, {
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
