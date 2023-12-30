import React, {useRef} from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Animated, useColorScheme,
} from "react-native";
import Paginator from "../../yourPet/petView/Paginator";
import PetViewMeta from "../../yourPet/petView/petViewElements/PetViewMeta";
import MissingPetViewDetails from "./missingPetViewElements/MissingPetViewDetails";
import {DarkTheme, LightTheme} from "../../../../../helper/theme/Theme";
import ThemedText from "../../../../../helper/themedText/ThemedText";

const MissingPetView = ({pet, userData}: any) => {
    const separatorColor = useColorScheme() === 'dark' ? DarkTheme.colors.secondary : LightTheme.colors.secondary;

    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <View style={styles.container}>
            <FlatList data={pet} renderItem={({item}) =>
                <>
                    <PetViewMeta item={item}/>
                    <MissingPetViewDetails item={item} userData={userData}/>
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
            <Paginator scrollX={scrollX} height={0} margin={20}/>
            <ThemedText style={styles.petStatus}>
                {pet[0].name + " is missing since " + new Date(pet[0].missingSince).toLocaleString('de-CH', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })}
            </ThemedText>
            <View style={[styles.underline, {backgroundColor: separatorColor}]}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    underline: {
        height: 1,
        width: '90%',
        marginTop: 50,
        marginBottom: 50
    },
    petStatus: {
        fontSize: 12,
        paddingBottom: 10,
        fontStyle: 'italic'
    }
});

export default MissingPetView;
