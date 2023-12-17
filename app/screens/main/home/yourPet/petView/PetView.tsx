import React, {useState, useRef} from "react";
import {StyleSheet, View, FlatList, Animated, TouchableOpacity, Text, Alert} from "react-native";
import Paginator from "./Paginator";
import PetViewMeta from "./petViewElements/PetViewMeta";
import PetViewDetails from "./petViewElements/PetViewDetails";
import ThemedText from "../../../../../helper/themedText/ThemedText";

const PetView = ({pet, userData, checkForPets}: any) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const [missing, setMissing] = useState(pet[0].missing)
    console.log("MISSING: " + missing)

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const handleMissing = () => {
        missing ? Alert.alert("Pet found!", "Your pet will be marked as found.\n\n" +
                "Other people in your area will no longer be able to see your pet in their timeline.", [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            }, {
                text: "Mark as found",
                onPress: () => {
                    setMissing(false)
                    Alert.alert("Successfully saved", "Your pet has been marked as found.\n\n" +
                        "Other people in your area are no longer able to see your pet in their timeline.")
                }
            }]) :
            Alert.prompt("Report missing", "Are you sure you want to report your pet as missing?\n\n" +
                "Pet details will be posted publicly.\n\nOther people will be able to aid you with your search.\n\n" +
                "Type \"Missing\" to confirm.",
                (event) => {
                    if (event === "Missing") {
                        setMissing(true)
                        Alert.alert("Successfully reported", "Your pet has been reported as missing.\n\n" +
                            "Other people in your area will be able to see your pet in their timeline.")
                    } else {
                        Alert.alert("Mistyped", "Your pet has not been reported as missing.")
                    }
                })
    }

    return (

        <View style={[styles.container, missing ? styles.containerMissing : styles.containerAtHome]}>
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
            <Paginator scrollX={scrollX}/>
            <TouchableOpacity style={[styles.btn, missing ? styles.btnPetSave : styles.btnReportMissing]}
                              onPress={handleMissing}>
                <Text style={styles.btnText}>{missing ? "Pet found!" : "Report Missing!"}</Text>
            </TouchableOpacity>
            <ThemedText style={styles.petStatus}>
                {missing ? pet[0].name + " is currently marked as missing" : pet[0].name + " is currently safe at home"}
            </ThemedText>
        </View>
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
        backgroundColor: "#8c6868"
    },
    containerAtHome: {
        backgroundColor: "#717c6b"
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
