import React, {useState, useEffect} from "react";
import {Alert, ScrollView, StyleSheet, View} from "react-native";
import {FIREBASE_DATABASE} from "../../../../../FirebaseConfig";
import {ref, get} from 'firebase/database';
import MissingPetView from "./missingPetsView/MissingPetView";
import ReportSightingView from "./missingPetsView/reportSightingView/ReportSightingView";

const MissingPets = ({userData}: any) => {
    const [usersWithMissingPet, setUsersWithMissingPet]: any = useState(null)
    const [showReportSightingView, setShowReportSightingView] = useState(false);
    const usersRef = ref(FIREBASE_DATABASE, "users");

    const handleReportSighting = (pet?: any) => {
        setShowReportSightingView(!showReportSightingView);
    }

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
        <>
            {!showReportSightingView ?
                <ScrollView style={styles.container}>
                    {usersWithMissingPet !== null && usersWithMissingPet.map((userWithMissingPet: any) => {
                        return <MissingPetView
                            pet={userWithMissingPet.pet}
                            userData={userWithMissingPet}
                            key={userWithMissingPet.id}
                            handleReportSighting={handleReportSighting}
                        />
                    })}
                </ScrollView>
                : <ReportSightingView setShowReportSightingView={setShowReportSightingView}/>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default MissingPets;