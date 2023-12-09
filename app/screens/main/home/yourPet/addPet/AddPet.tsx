import * as React from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity, useColorScheme,
    View
} from "react-native";
import ThemedText from "../../../../../helper/themedText/ThemedText";
import {ref, set} from "firebase/database";
import {ref as strgRef, uploadBytes } from "firebase/storage";
import {FIREBASE_DATABASE} from "../../../../../../FirebaseConfig";
import {useState} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {DarkTheme, LightTheme} from "../../../../../helper/theme/Theme";
import {STORAGE} from "../../../../../../FirebaseConfig";


const YourPet = ({userData, setShowAddPet}: any) => {
    const userRef = ref(FIREBASE_DATABASE, "users/" + userData.id + "/pet");
    const storageRef = strgRef(STORAGE, 'image')
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const submit = (e: any) => {
        e.preventDefault();
        if (image) {
            uploadBytes(storageRef, image).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            }).catch((error) => {
                console.log(error);
            });
        } else {
            console.log("No image selected!");
        }
    }

    const petObject = [
        {
            id: 0,
            name: name,
            imageUrl: "https://random.dog/b780466a-d547-45db-9168-924e3dc485ea.jpg"
        }, {
            id: 1,
            name: name,
            age: age,
            type: type,
            breed: breed,
            color: color,
        }
    ]

    const createPetObject = () => {
        if (name === "" || age === "" || type === "" || breed === "" || color === "" || image === "") {
            alert("Please fill out all fields!");
            return;
        }

        console.log("Creating pet object...");
        setLoading(true)

        set(userRef, petObject).then(() => {
            console.log("Pet object added successfully!")
            setLoading(false)
            setShowAddPet(false)
        }).catch((error) => {
            console.log("Failed to add pet object:", error);
        });
    }

    return (
        <SafeAreaView style={{flex: 1, width: '100%'}}>
            <View style={{alignItems: "flex-start"}}>
                <TouchableOpacity style={styles.backButton} onPress={() => setShowAddPet(false)}>
                    <ThemedText>Back</ThemedText>
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
                style={styles.mainContainer}
                contentContainerStyle={styles.inner}
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={true}
                keyboardOpeningTime={0}
            >
                <ThemedText style={styles.title}>Pet details</ThemedText>
                <TextInput
                    style={[styles.input, {color: textColor}]}
                    placeholder="Pet name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="none"
                    keyboardType="default"
                />
                <TextInput
                    style={[styles.input, {color: textColor}]}
                    placeholder="Age"
                    value={age}
                    onChangeText={(text) => setAge(text)}
                    autoCapitalize="none"
                    keyboardType="numeric"
                />
                <TextInput
                    style={[styles.input, {color: textColor}]}
                    placeholder="Pet type (Dog, Cat, etc.)"
                    value={type}
                    onChangeText={(text) => setType(text)}
                    autoCapitalize="none"
                    keyboardType="default"
                />
                <TextInput
                    style={[styles.input, {color: textColor}]}
                    placeholder="Breed (Bernese Mountain Dog, etc.)"
                    value={breed}
                    onChangeText={(text) => setBreed(text)}
                    autoCapitalize="none"
                    keyboardType="default"
                />
                <TextInput
                    style={[styles.input, {color: textColor}]}
                    placeholder="Color (Black, Brown, etc.)"
                    value={color}
                    onChangeText={(text) => setColor(text)}
                    autoCapitalize="none"
                    keyboardType="default"
                />

                <input type={"file"} onChange={handleChange}/>
                <input type={"button"} onClick={submit}>Upload</input>

                {/*<TextInput*/}
                {/*    style={[styles.input, {color: textColor}]}*/}
                {/*    placeholder="Upload image..."*/}
                {/*    value={image}*/}
                {/*    onChangeText={(text) => setImage(text)}*/}
                {/*    autoCapitalize="none"*/}
                {/*    keyboardType="default"*/}
                {/*/>*/}

                <View style={styles.actionContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff"/>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.submitButton} onPress={() => createPetObject()}>
                                <ThemedText>Add pet</ThemedText>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: "#8e8e93",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 250,
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: "#34c759",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    inner: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        width: "80%",
        height: 48,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginBottom: 16,
        backgroundColor: "#1c1c1e",
        minWidth: "90%",
        color: "#fff",
    },
    actionContainer: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    }
});


export default YourPet;
