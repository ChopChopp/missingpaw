import React, {useRef} from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Animated,
} from "react-native";
import Paginator from "../../yourPet/petView/Paginator";
import PetViewMeta from "../../yourPet/petView/petViewElements/PetViewMeta";
import MissingPetViewDetails from "./missingPetViewElements/MissingPetViewDetails";

const MissingPetView = ({pet, userData}: any) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    // console.log("PET: ", pet)
    // console.log("USER DATA: ", userData)
    return (
        <View style={styles.container}>
            <View style={{flex: 3}}>
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
            </View>
            <Paginator scrollX={scrollX}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        gap: -20,
    }
});

export default MissingPetView;
