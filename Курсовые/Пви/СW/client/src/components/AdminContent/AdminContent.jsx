import React, { useEffect,useState } from 'react';
import {getUsers} from '../../services/apiUser';


const AdminContent = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
        const data = await getUsers();
          setUsers(data);
        };
      
        fetchUsers();
      }, []);


    const [newUser, setNewUser] = useState({ name: "", age: "" });

    // Add user function
    const addUser = () => {
        setUsers([...users, newUser]);
        setNewUser({ name: "", age: "" });
    };

    // Edit user function
    const editUser = (index, updatedUser) => {
        const updatedUsers = [...users];
        updatedUsers[index] = updatedUser;
        setUsers(updatedUsers);
    };

    
    return (
        <div>
            {users.map((user, index) => (
            <div key={user._id}>
                <input type="text" defaultValue={user.login} />
                <input type="text" defaultValue={user.status} />
                <input type="text" defaultValue={user.email} />
                <input type="text" defaultValue={user._id} readOnly />
                <button onClick={() => editUser(index, { ...user, age: user.age + 1 })}>Edit</button>
            </div>
            ))}
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newUser.age}
                    onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                />
                <button type="button" onClick={addUser}>Add User</button>
            </form>
        </div>
    );
};

export default AdminContent;


