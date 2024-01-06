import React, {useState, useRef} from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Animated,
    TouchableOpacity,
    Text,
    Alert,
    useColorScheme,
    ActivityIndicator
} from "react-native";
import Paginator from "./Paginator";
import PetViewMeta from "./petViewElements/PetViewMeta";
import PetViewDetails from "./petViewElements/PetViewDetails";
import {LinearGradient} from 'expo-linear-gradient';
import {DarkTheme, LightTheme} from "../../../../../helper/theme/Theme";
import {ref, update} from "firebase/database";
import {FIREBASE_DATABASE} from "../../../../../../FirebaseConfig";

const PetView = ({pet, userData, checkForPets}: any) => {
    const backgroundColor = useColorScheme() === 'dark' ? DarkTheme.colors.background : LightTheme.colors.background;

    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const handleMissing = () => {
        const updates: any = {};

        pet[0].missing ? Alert.alert("Pet found", "Your pet will be marked as found.\n\nOther people in your area will no longer be able to see your pet in their timeline.", [{
                text: "Cancel",
                style: "cancel",
            }, {
                text: "Mark as found",
                onPress: () => {
                    setLoading(true)
                    updates["users/" + userData.id + "/pet/0/missing"] = false;
                    updates["users/" + userData.id + "/pet/0/missingSince"] = 0;
                    updates["users/" + userData.id + "/pet/0/missingLocation"] = "";

                    update(ref(FIREBASE_DATABASE), updates).then(() => {
                        checkForPets();
                        Alert.alert("Found", "Your pet has been marked as found.\n\nOther people in your area are no longer able to see your pet in their timeline.")
                        setLoading(false)
                    }).catch((error) => {
                        Alert.alert("Error", "Failed to update pet object:\n\n" + error)
                        console.error("Failed to update pet object:", error);
                        setLoading(false)
                    });
                }
            }]) :
            Alert.prompt(
                "Report missing (1/2)",
                "Are you sure you want to report your pet as missing?\n\nPet details will be posted publicly.\n\nOther people will be able to aid you with your search.\n\nType \"Missing\" to confirm.",
                (event) => {
                    if (event === "Missing") {
                        Alert.prompt(
                            "Report missing (2/2)",
                            "Where did your pet go missing?\n\nOther people will be able to see this information.",
                            (locationPrompt) => {
                                if (locationPrompt !== "") {
                                    setLoading(true)
                                    updates["users/" + userData.id + "/pet/0/missing"] = true;
                                    updates["users/" + userData.id + "/pet/0/missingSince"] = new Date().getTime();
                                    updates["users/" + userData.id + "/pet/0/missingLocation"] = locationPrompt;

                                    update(ref(FIREBASE_DATABASE), updates).then(() => {
                                        checkForPets();
                                        Alert.alert("Reported", "Your pet has been reported as missing.\n\nOther people in your area will be able to see your pet in their timeline.")
                                        setLoading(false)
                                    }).catch((error) => {
                                        Alert.alert("Error", "Failed to update pet object:\n\n" + error)
                                        console.error("Failed to update pet object:", error);
                                        setLoading(false)
                                    });
                                } else {
                                    Alert.alert("No location", "Please enter a valid location.")
                                }
                            },
                        )
                    } else {
                        Alert.alert("Mistyped", "Your pet has not been reported as missing.")
                    }
                })
    }

    return (
        <LinearGradient
            colors={pet[0].missing ? ['#c05252', backgroundColor] : ['rgba(48,209,88,0.75)', backgroundColor]}
            start={[1, 1]}
            end={[1, 0]}
            style={styles.container}
        >
            <View style={{flex: 3}}>
                <FlatList data={pet} renderItem={({item}) =>
                    <>
                        <PetViewMeta item={item}/>
                        <PetViewDetails item={item} userData={userData} checkForPets={checkForPets}/>
                    </>}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          pagingEnabled
                          bounces={false}
                          keyExtractor={(item) => item.id}
                          onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                              useNativeDriver: false
                          })}
                          scrollEventThrottle={32}
                          viewabilityConfig={viewConfig}
                          ref={slidesRef}
                />
            </View>
            <Paginator scrollX={scrollX} height={64} margin={0}/>
            {loading && <ActivityIndicator size="small" color="#0000ff"/>}
            <TouchableOpacity style={[styles.btn, pet[0].missing ? styles.btnPetSave : styles.btnReportMissing]}
                              onPress={handleMissing}>
                <Text
                    style={styles.btnText}>{pet[0].missing ? pet[0].name + " found!" : "Report " + pet[0].name + " missing!"}</Text>
            </TouchableOpacity>
            <Text style={styles.petStatus}>
                {pet[0].missing
                    ? pet[0].name + " is missing since " + new Date(pet[0].missingSince).toLocaleString('de-CH', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                }) : pet[0].name + " is currently safe at home"}
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        gap: -20,
    },
    containerMissing: {
        backgroundColor: "#c05252"
    },
    containerAtHome: {
        backgroundColor: "#B0D9B1"
    },
    petStatus: {
        fontSize: 12,
        paddingBottom: 10,
        fontStyle: 'italic'
    },
    btn: {
        paddingTop: 20,
        paddingRight: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 5,
        marginBottom: 25,
    },
    btnReportMissing: {
        backgroundColor: '#ff3b30',
    },
    btnPetSave: {
        backgroundColor: '#30d158',
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});


export default PetView;
