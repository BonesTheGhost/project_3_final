import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    //DUMMY DATA FOR TESTING.
    const USERS = [
        {
            id: 'u1', 
            name: 'Bones', 
            image: 
            'https://homepages.cae.wisc.edu/~ece533/images/airplane.png', 
            places: 3
        }
    ];

    return <UsersList items={USERS} />
};

export default Users;