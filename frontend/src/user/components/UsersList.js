import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';


const UsersList = props => {
    //This is basically validation in case our container for our users is empty.
    if ( props.items.length === 0) {
        return ( 
        <div className="center">
            <Card>
            <h2>No User's Found...</h2>
            </Card>
        </div>
        );
    }
    //This actually maps the container to output:
    //items is the name of our array which contains OBJECTS, and we want to go through it and map every item in there into an array of JSX elements. Use the {} to output the results of a javascript expression; i.e. taking the items array, mapping it into JSX by passing a user object? and then outputting it as a UserItem JSX element which we define in our 'UserItem' file that we imported.
    //NOTE: during setup, NONE of this data existed. We decide what we want, and then we go and create it!! Ideally use dummy data first, and then as setup progresses, add in the necessary streams.
    //ALSO; React needs 'id to handle lists effectively.
    return (
    <ul className="users-list">
        {props.items.map(user => (
        <UserItem 
            key={user.id} 
            id={user.id} 
            image={user.image} 
            name={user.name} 
            placeCount={user.places}
            />
        ))}
    </ul>
    )
};

export default UsersList;