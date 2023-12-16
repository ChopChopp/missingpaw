import React from "react";
import {StyleSheet, View, Image, useWindowDimensions} from "react-native";
import ThemedText from "../../../../../helper/themedText/ThemedText";
import Dog from "../../../../../helper/icons/Dog";
import Color from "../../../../../helper/icons/Color";
import Breed from "../../../../../helper/icons/Breed";
import DogTag from "../../../../../helper/icons/DogTag";
import Paw from "../../../../../helper/icons/Paw";
import ArrowRight from "../../../../../helper/icons/ArrowRight";

const PetViewItem = ({item}: any) => {

    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            {item.id === 1 ? (
                <View style={styles.petDetails}>
                    <ThemedText style={styles.subTitle}>Pet details</ThemedText>

                    <View style={styles.petDetailsElement}>
                        <DogTag style={styles.icon}/>
                        <ThemedText style={styles.key}>Name: </ThemedText>
                        <ThemedText style={styles.value}>{item.name}</ThemedText>
                        <ArrowRight style={styles.editIcon}/>
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Dog style={styles.icon}/>
                        <ThemedText style={styles.key}>Age: </ThemedText>
                        <ThemedText style={styles.value}>{item.age}</ThemedText>
                        <ArrowRight style={styles.editIcon}/>
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Breed style={styles.icon}/>
                        <ThemedText style={styles.key}>Breed: </ThemedText>
                        <ThemedText style={styles.value}>{item.breed}</ThemedText>
                        <ArrowRight style={styles.editIcon}/>
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Color style={styles.icon}/>
                        <ThemedText style={styles.key}>Color: </ThemedText>
                        <ThemedText style={styles.value}>{item.color}</ThemedText>
                        <ArrowRight style={styles.editIcon}/>
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Paw style={styles.icon}/>
                        <ThemedText style={styles.key}>Type: </ThemedText>
                        <ThemedText style={styles.value}>{item.type}</ThemedText>
                        <ArrowRight style={styles.editIcon}/>
                    </View>
                </View>

            ) : (
                <View style={styles.petContainer}>
                    <ThemedText style={styles.title}>{item.name}</ThemedText>
                    <Image source={{uri: item.imageUrl}} style={styles.image}/>
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    image: {
        width: '95%',
        aspectRatio: 1,
        borderRadius: 10
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
    petContainer: {
        justifyContent: "center",
        borderRadius: 20
    },
    petDetails: {
        backgroundColor: "#8c8c8c",
        width: '95%',
        height: '73.5%',
        marginTop: 50,
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
    editIcon: {
        marginTop: 5,
        marginLeft: 20,
    },
    key: {
        fontWeight: "bold",
    },
    value: {
        marginLeft: 'auto',
    },
});

export default PetViewItem;
