import React from "react";
import {StyleSheet, View, Image, useWindowDimensions, Text} from "react-native";
import ThemedText from "../../../../../helper/themedText/ThemedText";

const PetViewItem = ({item}: any) => {

    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            {item.id === 1 ? (
                <View style={{flex: 0.3}}>
                    <ThemedText style={styles.title}>{item.name}</ThemedText>
                    <ThemedText style={styles.description}>Age: {item.age}</ThemedText>
                    <ThemedText style={styles.description}>Breed: {item.breed}</ThemedText>
                    <ThemedText style={styles.description}>Color: {item.color}</ThemedText>
                    <ThemedText style={styles.description}>Type: {item.type}</ThemedText>
                </View>
            ) : (
                <>
                    <ThemedText style={styles.title}>{item.name}</ThemedText>
                    <Image source={{uri: item.imageUrl}} style={styles.image}/>
                </>
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
        flex: 0.7,
        justifyContent: "center",
        width: 200,
        height: 200
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
    }
});

export default PetViewItem;
