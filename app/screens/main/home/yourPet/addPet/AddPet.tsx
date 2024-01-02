import * as React from "react";
import {useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import ThemedText from "../../../../../helper/themedComponents/themedText/ThemedText";
import {ref, set} from "firebase/database";
import {ref as strgRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {FIREBASE_DATABASE, STORAGE} from "../../../../../../FirebaseConfig";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {DarkTheme, LightTheme} from "../../../../../helper/theme/Theme";
import * as ImagePicker from "expo-image-picker";


const AddPet = ({userData, setShowAddPet}: any) => {
    const userRef = ref(FIREBASE_DATABASE, "users/" + userData.id + "/pet");
    const storageRef = strgRef(STORAGE, userData.id)
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [type, setType] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);

    const uriToBlob = async (uri: string) => {
        const response = await fetch(uri);
        return await response.blob();
    };

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                `Sorry, we need camera  
                 roll permission to upload images.`
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }
    };

    const createPetObject = () => {
        if (name === "" || age === "" || type === "" || breed === "" || color === "" || image === "") {
            alert("Please fill out all fields!");
            return;
        }

        console.info("Creating pet object...");
        setLoading(true)

        uriToBlob(image).then((blob) => {
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.info('Uploaded a blob!');
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    const petObject = [
                        {
                            id: 0,
                            name: name,
                            age: age,
                            type: type,
                            breed: breed,
                            color: color,
                            imageUrl: downloadURL,
                            missing: false,
                            missingSince: 0
                        }
                    ]

                    set(userRef, petObject).then(() => {
                        console.info("Pet object added successfully!")
                        setLoading(false)
                        setShowAddPet(false)
                    }).catch((error) => {
                        console.error("Failed to add pet object:", error);
                        setLoading(false);
                    });
                }).catch((error) => {
                    console.error("Failed to get download URL", error);
                });
            }).catch((error) => {
                console.error("Error uploading file:", error);
                setLoading(false);
            });
        }).catch((error) => {
            console.error("Error converting URI to blob:", error);
            setLoading(false);
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

                <Button title="Select Image" onPress={pickImage}/>
                {image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>}

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
        minWidth: "90%",
        color: "#fff",
    },
    actionContainer: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    }
});


export default AddPet;
