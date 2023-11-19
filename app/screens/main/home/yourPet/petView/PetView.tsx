import React, {useState, useRef} from "react";
import {StyleSheet, View, FlatList, Animated} from "react-native";
import PetViewItem from "./PetViewItem";
import Paginator from "./Paginator";

const PetView = ({pet}: any) => {
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
                <FlatList data={pet} renderItem={({item}) => <PetViewItem item={item} currentIndex={currentIndex}/>}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    }
});

export default PetView;
