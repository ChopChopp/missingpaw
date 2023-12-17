import React from "react";
import {
    Image,
    StyleSheet,
    useWindowDimensions,
    View
} from "react-native";
import ThemedText from "../../../../../../helper/themedText/ThemedText";

const PetViewMeta = ({item}: any) => {
    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <View style={styles.petContainer}>
                <ThemedText style={styles.title}>{item.name}</ThemedText>
                <Image source={{uri: item.imageUrl}} style={styles.image}/>
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
    petContainer: {
        justifyContent: "center",
        borderRadius: 20
    },
});

export default PetViewMeta;
