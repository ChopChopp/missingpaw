import * as React from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import ThemedText from "../../../../helper/themedComponents/themedText/ThemedText";
import {FIREBASE_DATABASE} from "../../../../../FirebaseConfig";
import {ref, get} from "firebase/database";
import {useEffect, useState} from "react";
import AddPet from "./addPet/AddPet";
import PetView from "./petView/PetView";

interface Pet {
    name: string;
    age: number;
    type: string;
    breed: string;
    color: string;
    imageUrl: string;
}

const YourPet = ({userData}: any) => {
    const [pet, setPet] = useState<Pet | null>(null);
    const [hasPets, setHasPets] = useState<boolean | null>(null);
    const [showAddPet, setShowAddPet] = useState<boolean>(false);

    const userRef = ref(FIREBASE_DATABASE, "users/" + userData.id + "/pet");

    const checkForPets = () => {
        get(userRef).then(snapshot => {
            if (snapshot.exists()) {
                setPet(snapshot.val());
                setHasPets(true);
            } else {
                setHasPets(false);
            }
        }).catch((error) => {
            console.error('Error checking for pets:', error);
            setHasPets(false);
        });
    };

    useEffect(() => {
        checkForPets();
    }, [showAddPet]);

    return (
        <SafeAreaView>
            {hasPets
                ?
                <>
                    {pet && (
                        <PetView pet={pet} userData={userData} checkForPets={checkForPets}/>
                    )}
                </>
                :
                showAddPet ?
                    <AddPet userData={userData} setShowAddPet={setShowAddPet}/>
                    :
                    <View style={styles.container}>
                        <ThemedText>You don't have a pet yet!</ThemedText>
                        <TouchableOpacity style={styles.button} onPress={() => setShowAddPet(true)}>
                            <ThemedText>Click here to add your pet</ThemedText>
                        </TouchableOpacity>
                    </View>

            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:
            "column",
        alignItems:
            'center',
        justifyContent:
            "center",
    }
    ,
    button: {
        paddingHorizontal: 10,
        marginHorizontal:
            5,
        backgroundColor:
            "#8e8e93",
        borderRadius:
            5,
    }
});


export default YourPet;
