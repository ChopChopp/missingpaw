import React, {useState} from 'react';
import {View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";
import ThemedLink from "../../../helper/themedComponents/themedLink/ThemedLink";

let align: "center" | "auto" | "left" | "right" | "justify" | undefined = "center";

const TermsAndConditions = ({acceptTerms}: any) => {
    const [closeToBottom, setCloseToBottom] = useState(false);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <View style={styles.container}>
            <ThemedText style={styles.title}>Terms and conditions</ThemedText>
            <ScrollView
                scrollEventThrottle={16}
                style={styles.tcContainer}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setCloseToBottom(true)
                    }
                }}
            >
                <ThemedText style={styles.tcP}>Welcome to our Missing Paw application. If you continue to use this application,
                    you are agreeing to comply with and be bound by the following terms and conditions of use, which
                    together with our privacy policy govern MissingPaw’s relationship with you in relation to
                    this website. If you disagree with any part of these terms and conditions, please do not use our
                    website.</ThemedText>
                <ThemedText style={styles.tcP}>The term ‘MissingPaw’ or ‘us’ or ‘we’ refers to the owner of the
                    application whose registered office is in Zurich. Our company registration number is NOT YET DEFINED.
                    The term ‘you’ refers to the user or viewer of our application.</ThemedText>
                <ThemedText style={styles.tcL}>{'\u2022'} The content of the pages of this application is for your general
                    information and use only. It is subject to change without notice.</ThemedText>
                <ThemedText style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or
                    guarantee as to the accuracy, timeliness, performance, completeness or suitability of the
                    information and materials found or offered on this application for any particular purpose. You
                    acknowledge that such information and materials may contain inaccuracies or errors and we
                    expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted
                    by law.</ThemedText>
                <ThemedText style={styles.tcL}>{'\u2022'} Your use of any information or materials on this application is
                    entirely at your own risk, for which we shall not be liable. It shall be your own responsibility
                    to ensure that any products, services or information available through this application meet your
                    specific requirements.</ThemedText>
                <ThemedText style={styles.tcL}>{'\u2022'} This application contains material which is owned by or licensed
                    to us. This material includes, but is not limited to, the design, layout, look, appearance and
                    graphics. Reproduction is prohibited other than in accordance with the copyright notice, which
                    forms part of these terms and conditions.</ThemedText>
                <ThemedText style={styles.tcL}>{'\u2022'} All trademarks reproduced in this application, which are not the
                    property of, or licensed to the operator, are acknowledged on the application.
                    Unauthorised use of this application may give rise to a claim for damages and/or be a criminal offence.</ThemedText>
                <ThemedText style={styles.tcL}>{'\u2022'} From time to time, this application may also include links to other
                    websites. These links are provided for your convenience to provide further information. They do
                    not signify that we endorse the website(s). We have no responsibility for the content of the
                    linked website(s).</ThemedText>
                <ThemedText style={styles.tcL}>{'\u2022'} Your use of this application and any dispute arising out of such
                    use of the website is subject to the laws of Switzerland.</ThemedText>
                <ThemedText style={styles.tcP}>The use of this application is subject to the following terms of
                    use under following website:</ThemedText>
                <ThemedLink url={"https://missingpaw.ch/"} style={styles.tcP}>https://missingpaw.ch/</ThemedLink>
            </ScrollView>

            <TouchableOpacity
                disabled={!closeToBottom}
                onPress={() => acceptTerms()}
                style={closeToBottom ? styles.button : styles.buttonDisabled}>
                <ThemedText style={styles.buttonLabel}>Accept</ThemedText>
            </TouchableOpacity>
        </View>
    );

}

const {height} = Dimensions.get('window');

const styles = {
    container: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 22,
        textAlign: align
    },
    tcP: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    tcL: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    tcContainer: {
        marginTop: 15,
        marginBottom: 15,
        height: height * .7
    },

    button: {
        backgroundColor: '#136AC7',
        borderRadius: 5,
        padding: 10
    },

    buttonDisabled: {
        backgroundColor: '#999',
        borderRadius: 5,
        padding: 10
    },

    buttonLabel: {
        textAlign: align,
        fontSize: 14,
        color: '#FFF',
    }

}

export default TermsAndConditions;