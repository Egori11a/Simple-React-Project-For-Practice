import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Список пользователей: https://reqres.in/api/users

function App() {
    const [users, setUsers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((res) => res.json())
            .then((json) => setUsers(json.data))
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, []);

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const onClickInvite = (id) => {
        setInvites((prev) =>
            prev.includes(id) ? prev.filter((_id) => _id !== id) : [id, ...prev]
        );
    };

    return (
        <div className="App">
            {success ? (
                <Success count={invites.length} onBack={() => setSuccess(false)} />
            ) : (
                <Users
                    onChangeSearchValue={onChangeSearchValue}
                    searchValue={searchValue}
                    items={users}
                    isLoading={isLoading}
                    invites={invites}
                    onClickInvite={onClickInvite}
                    onClickSendInvites={() => setSuccess(true)}
                />
            )}
        </div>
    );
}

export default App;