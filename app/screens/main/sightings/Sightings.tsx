import React, {useEffect} from "react";
import {Alert, SafeAreaView, StyleSheet} from "react-native";
import SightingsView from "./sightingsView/SightingView";
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";
import {ref, update} from "firebase/database";
import {FIREBASE_DATABASE} from "../../../../FirebaseConfig";

interface Sighting {
    id: number;
    description: string;
    location: string;
    reporter: string;
    date: string;
    seen: boolean;
}

interface Pet {
    sightings?: Sighting[];
}

interface UserData {
    pet: Pet[];
    id: string;
}

interface SightingsProps {
    userData: UserData;
}

const Sightings: React.FC<SightingsProps> = ({userData}) => {


    const handleNotification = (sighting: Sighting) => {
        // const updates: any = {};
        // updates["users/" + userData.id + "/pet/0/sightings"] = 0;
        //
        // update(ref(FIREBASE_DATABASE), updates).then(() => {
        //     checkForPets();
        //     Alert.alert("Found", "Your pet has been marked as found.\n\nOther people in your area are no longer able to see your pet in their timeline.")
        //     setLoading(false)
        // }).catch((error) => {
        //     Alert.alert("Error", "Failed to update pet object:\n\n" + error)
        //     console.error("Failed to update pet object:", error);
        //     setLoading(false)
        // });
    }

    return (
        <SafeAreaView style={styles.container}>
            {userData?.pet?.[0]?.sightings ? (
                Object.keys(userData.pet[0].sightings).map((key: any) => userData.pet[0].sightings?.[key])
                    .filter((sighting: any) => sighting !== null) // Filter out null values
                    .map((sighting: any) => {
                        handleNotification(sighting);
                        return (
                            <SightingsView
                                key={sighting.id}
                                sighting={sighting}
                            />
                        );
                    })
            ) : (
                <ThemedText>{userData?.pet ? 'You have no sightings reported' : 'You have no pet'}</ThemedText>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Sightings;