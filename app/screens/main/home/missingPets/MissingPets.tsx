import React, {useState, useEffect} from "react";
import {Alert, ScrollView} from "react-native";
import {FIREBASE_DATABASE} from "../../../../../FirebaseConfig";
import {ref, get} from 'firebase/database';
import MissingPetView from "./missingPetsView/MissingPetView";

const MissingPets = ({userData}: any) => {
    const [usersWithMissingPet, setUsersWithMissingPet]: any = useState(null)
    const usersRef = ref(FIREBASE_DATABASE, "users");

    const getUsersWithMissingPet = () => {
        get(usersRef).then((snapshot) => {
            if (snapshot.exists()) {
                const users = snapshot.val();

                setUsersWithMissingPet(Object.keys(users).filter((userId) => {
                    return users[userId] && users[userId].pet && users[userId].pet[0].missing === true && users[userId].id !== userData.id
                }).map(userId => users[userId]));
            } else {
                Alert.alert("No users found", "There are currently no missing animals in your area.");
                console.info('No users found');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getUsersWithMissingPet()
    }, []);

    return (
        <ScrollView>
            {usersWithMissingPet !== null && usersWithMissingPet.map((userWithMissingPet: any) => {
                return <MissingPetView pet={userWithMissingPet.pet}
                                       userData={userWithMissingPet}
                                       key={userWithMissingPet.id}/>
            })}
        </ScrollView>
    );
}

export default MissingPets;