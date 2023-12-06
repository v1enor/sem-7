const API_URL = 'http://localhost:3001';

export function RegisterUser(user) {
  return fetch(`${API_URL}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
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

export async function authenticateUser(user) {
  return fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  })
  .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Save the authentication token
      localStorage.setItem('authToken', data.token);
      return data;
    })
    .catch(error => {
      // Handle any errors
      throw new Error(error.message);
    });
}

export async function authenticateAdmin(user) {
  return fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  })
  .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Save the authentication token
      localStorage.setItem('authTokenAdmin', data.token);
      return data;
    })
    .catch(error => {
      // Handle any errors
      throw new Error(error.message);
    });
}


export async function getUsers() {
  const token = localStorage.getItem('authToken');

  return fetch(`${API_URL}/admin/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
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


