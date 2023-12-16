import React from "react";
import {StyleSheet, View, Image, useWindowDimensions} from "react-native";
import ThemedText from "../../../../../helper/themedText/ThemedText";

const PetViewItem = ({item}: any) => {

    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            {item.id === 1 ? (
                <View style={styles.petDetails}>
                    <ThemedText style={styles.description}>Age: {item.age}</ThemedText>
                    <ThemedText style={styles.description}>Breed: {item.breed}</ThemedText>
                    <ThemedText style={styles.description}>Color: {item.color}</ThemedText>
                    <ThemedText style={styles.description}>Type: {item.type}</ThemedText>
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
    description: {
        fontWeight: "300",
        paddingHorizontal: 64,
        textAlign: "center"
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
        justifyContent: "flex-start"
    }
});

export default PetViewItem;
