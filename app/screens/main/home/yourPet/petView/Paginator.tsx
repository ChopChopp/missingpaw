import React from 'react';

import {View, StyleSheet, Animated, useWindowDimensions} from 'react-native';

const Paginator = ({scrollX}: any) => {
    const {width} = useWindowDimensions();

    return (
        <View style={{flexDirection: 'row', height: 64}}>
            {Array.from({length: 2}).map((_, i) => {
                console.log(i);

                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.4, 1, 0.4],
                    extrapolate: 'clamp',
                });

                return <Animated.View style={[styles.dot, {width: dotWidth, opacity}]} key={i.toString()}/>;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#8e8e93',
        marginHorizontal: 8,
    }
});

export default Paginator;