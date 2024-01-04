import React, {useEffect, useState} from "react";
import {Alert, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import SightingsView from "./sightingsView/SightingViewElement";
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";
import {ref, update} from "firebase/database";
import {FIREBASE_DATABASE} from "../../../../FirebaseConfig";
import SightingViewDetail from "./sightingsView/SightingViewDetail";

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

    const [showDetailedView, setShowDetailedView] = useState(false);
    const [sighting, setSighting] = useState<Sighting | null>(null);
    const [loading, setLoading] = useState(false);

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

    const toggleDetailedView = (sighting: Sighting) => {
        console.log("clicked")
        setShowDetailedView(!showDetailedView);
        setSighting(sighting);
    }

    return (
        <SafeAreaView style={styles.container}>
            {!showDetailedView ?
                <>
                    <ThemedText style={{fontSize: 24, fontWeight: "bold", textAlign: 'center'}}>Sightings</ThemedText>
                    <ScrollView>
                        {userData?.pet?.[0]?.sightings ? (
                            Object.keys(userData.pet[0].sightings).map((key: any) => userData.pet[0].sightings?.[key])
                                .filter((sighting: any) => sighting !== null) // Filter out null values
                                .map((sighting: any) => {
                                    handleNotification(sighting);
                                    return (
                                        <SightingsView
                                            key={sighting.id}
                                            sighting={sighting}
                                            toggleDetailedView={toggleDetailedView}
                                        />
                                    );
                                })
                        ) : (
                            <ThemedText>{userData?.pet ? 'You have no sightings reported' : 'You have no pet'}</ThemedText>
                        )}
                    </ScrollView>
                </>
                : <SightingViewDetail sighting={sighting} toggleDetailedView={toggleDetailedView}/>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default Sightings;