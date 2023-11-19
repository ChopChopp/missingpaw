import * as React from "react";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import ThemedText from "../../../../helper/themedText/ThemedText";
import {FIREBASE_DATABASE} from "../../../../../FirebaseConfig";
import {ref, get} from "firebase/database";
import {useEffect, useState} from "react";
import AddPet from "./addPet/AddPet";

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
    const [showAddPet, setShowAddPet] = React.useState<boolean>(false);

    const userRef = ref(FIREBASE_DATABASE, "users/" + userData.id + "/pet");

    useEffect(() => {
        const checkForPets = () => {
            get(userRef).then(snapshot => {
                if (snapshot.exists()) {
                    console.log('User already has pets:', snapshot.val());
                    setPet(snapshot.val());
                    setHasPets(true);
                } else {
                    console.log('User does not have any pets.');
                    setHasPets(false);
                }
            }).catch((error) => {
                console.error('Error checking for pets:', error);
                setHasPets(false);
            });
        };

        checkForPets();
    }, [showAddPet]);


    return (
        <SafeAreaView>
            {hasPets
                ?
                <>
                    {pet && (
                        <>
                            <ThemedText>You already have a pet!</ThemedText>
                            <ThemedText>{pet.name}</ThemedText>
                            <ThemedText>{pet.age}</ThemedText>
                            <ThemedText>{pet.breed}</ThemedText>
                            <ThemedText>{pet.type}</ThemedText>
                            <ThemedText>{pet.color}</ThemedText>
                            <Image source={{uri: pet.imageUrl}} style={{width: 200, height: 200}}/>
                        </>
                    )}
                </>

                :
                showAddPet ?
                    <AddPet userData={userData} setShowAddPet={setShowAddPet} />
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
