import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';


const DUMMY_PLACES = [
    
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the tallest buildings in the West',
        imageURL: '',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Shanghai Tower',
        description: 'One of the tallest buildings in the East',
        imageURL: '',
        address: '1 Century Ave, Lu Jia Zui, Pudong, Shanghai, China',
        location: {
            lat: 31.2397,
            lng: 121.4998
        },
        creator: 'u2'
    }
    
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />
};

export default UserPlaces;