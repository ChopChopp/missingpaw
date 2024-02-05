import React, {useState} from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    useWindowDimensions,
    View
} from "react-native";
import ThemedText from "../../../../../../helper/themedComponents/themedText/ThemedText";

const PetViewMeta = ({item}: any) => {
    const {width} = useWindowDimensions();
    const [loading, setLoading] = useState(false)
    const ActivityIndicatorWrapper = () => {
        if (!loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="small" color="#0000ff"/>
            </View>
        );
    }

    return (
        <View style={[styles.container, {width}]}>
            <View style={styles.petContainer}>
                <ThemedText style={styles.title}>{item.name}</ThemedText>
                <ActivityIndicatorWrapper />
                <Image source={{uri: item.imageUrl}} style={styles.image} onLoadStart={() => setLoading(true)}
                       onLoadEnd={() => setLoading(false)}/>
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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    image: {
        width: '80%',
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
