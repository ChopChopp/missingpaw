import React from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity,} from "react-native";

const ReportSightingView = ({handleReportSighting}: any) => {
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.btn} onPress={() => handleReportSighting()}>
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 15,
        paddingTop: 20,
        paddingRight: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 5,
        backgroundColor: '#ff8983',
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default ReportSightingView;
