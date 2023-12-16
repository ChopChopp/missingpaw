import React, {useState, useRef} from "react";
import {StyleSheet, View, FlatList, Animated, TouchableOpacity, Text} from "react-native";
import PetViewItem from "./PetViewItem";
import Paginator from "./Paginator";

const PetView = ({pet}: any, {userRef}: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <FlatList data={pet} renderItem={({item}) => <PetViewItem item={item} currentIndex={currentIndex}
                                                                          userRef={userRef}/>}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          pagingEnabled
                          bounces={false}
                          keyExtractor={(item) => item.id}
                          onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                              useNativeDriver: false
                          })}
                          scrollEventThrottle={32}
                          onViewableItemsChanged={viewableItemsChanged}
                          viewabilityConfig={viewConfig}
                          ref={slidesRef}
                />
            </View>
            <Paginator data={pet} scrollX={scrollX}/>
            <TouchableOpacity style={styles.reportMissingButton} onPress={() => {
                console.log('REPORT MISSING PRESSED')
            }}>
                <Text style={styles.reportMissingButtonText}>Report Missing!</Text>
            </TouchableOpacity>
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
    reportMissingButton: {
        backgroundColor: '#ff3b30',
        paddingTop: 20,
        paddingRight: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 5,
        marginBottom: 35,
    },
    reportMissingButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default PetView;
