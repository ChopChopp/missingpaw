import React, {useState} from "react";
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
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

interface FetchUserData {
    (id: any): void;
}

interface SightingsProps {
    userData: UserData;
    fetchUserData: FetchUserData;
}

const Sightings: React.FC<SightingsProps> = ({userData, fetchUserData}) => {

    const [showDetailedView, setShowDetailedView] = useState(false);
    const [sighting, setSighting] = useState<Sighting | null>(null);

    const handleNotification = (sighting: Sighting) => {
        const updates = {[`users/${userData.id}/pet/0/sightings/${sighting.id}/seen`]: true};
        update(ref(FIREBASE_DATABASE), updates).then(() => {
            fetchUserData(userData.id);
        }).catch((error) => {
            Alert.alert("Failed to read notification: ", error);
        });
    }

    const toggleDetailedView = (sighting: Sighting) => {
        setShowDetailedView(!showDetailedView);
        setSighting(sighting);
        sighting !== undefined && !sighting.seen && handleNotification(sighting);
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
                                    return (
                                        <SightingsView
                                            key={sighting.id}
                                            sighting={sighting}
                                            toggleDetailedView={toggleDetailedView}
                                        />
                                    );
                                })
                        ) : (
                            <View style={styles.noPetsContainer}>
                                <ThemedText>{userData?.pet ? 'You have no sightings reported' : 'You have no pet'}</ThemedText>
                            </View>
                        )}
                    </ScrollView>
                </>
                : <>
                    <ThemedText style={{fontSize: 24, fontWeight: "bold", textAlign: 'center'}}>
                        Sighting details
                    </ThemedText>
                    <SightingViewDetail sighting={sighting} toggleDetailedView={toggleDetailedView}/>
                </>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noPetsContainer: {
        display: 'flex',
        alignItems: 'center',
    }
});

export default Sightings;