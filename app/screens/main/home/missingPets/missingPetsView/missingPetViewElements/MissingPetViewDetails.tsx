import React from "react";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import ThemedText from "../../../../../../helper/themedText/ThemedText";
import Dog from "../../../../../../helper/icons/Dog";
import Color from "../../../../../../helper/icons/Color";
import Breed from "../../../../../../helper/icons/Breed";
import DogTag from "../../../../../../helper/icons/DogTag";
import Paw from "../../../../../../helper/icons/Paw";

const PetViewItem = ({item}: any) => {
    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <View style={styles.petDetails}>

                <View style={styles.header}>
                    <ThemedText style={styles.subTitle}>Pet details</ThemedText>
                </View>

                <View style={styles.petDetailsElement}>
                    <DogTag style={styles.icon}/>
                    <ThemedText style={styles.key}>Name: </ThemedText>
                    <ThemedText style={styles.value}>{item.name}</ThemedText>
                </View>

                <View style={styles.petDetailsElement}>
                    <Dog style={styles.icon}/>
                    <ThemedText style={styles.key}>Age: </ThemedText>
                    <ThemedText style={styles.value}>{item.age}</ThemedText>
                </View>

                <View style={styles.petDetailsElement}>
                    <Breed style={styles.icon}/>
                    <ThemedText style={styles.key}>Breed: </ThemedText>
                    <ThemedText style={styles.value}>{item.breed}</ThemedText>
                </View>

                <View style={styles.petDetailsElement}>
                    <Color style={styles.icon}/>
                    <ThemedText style={styles.key}>Color: </ThemedText>
                    <ThemedText style={styles.value}>{item.color}</ThemedText>
                </View>

                <View style={styles.petDetailsElement}>
                    <Paw style={styles.icon}/>
                    <ThemedText style={styles.key}>Type: </ThemedText>
                    <ThemedText style={styles.value}>{item.type}</ThemedText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#606060",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        textAlign: "center"
    },
    subTitle: {
        textAlign: "center",
        fontSize: 14,
        margin: 5,
    },

    petDetails: {
        backgroundColor: "#8c8c8c",
        width: '95%',
        height: '87%',
        marginTop: 55,
        borderRadius: 6,
        justifyContent: "flex-start",
    },
    petDetailsElement: {
        flexDirection: "row",
        backgroundColor: "#737373",
        padding: 10,
        borderTopColor: "#8c8c8c",
        borderTopWidth: 1,
    },
    icon: {
        marginRight: 10,
        marginTop: 5,
    },
    key: {
        fontWeight: "bold",
    },
    value: {
        marginLeft: 'auto',
    },

});

export default PetViewItem;
