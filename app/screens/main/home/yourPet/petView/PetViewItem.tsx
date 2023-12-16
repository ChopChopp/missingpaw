import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    View,
    Image,
    useWindowDimensions,
    TouchableOpacity,
    TextInput,
    useColorScheme,
    Alert
} from "react-native";
import ThemedText from "../../../../../helper/themedText/ThemedText";
import Dog from "../../../../../helper/icons/Dog";
import Color from "../../../../../helper/icons/Color";
import Breed from "../../../../../helper/icons/Breed";
import DogTag from "../../../../../helper/icons/DogTag";
import Paw from "../../../../../helper/icons/Paw";
import Edit from "../../../../../helper/icons/Edit";
import Check from "../../../../../helper/icons/Check";
import {DarkTheme, LightTheme} from "../../../../../helper/theme/Theme";
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, ref as strgRef, uploadBytes} from "firebase/storage";
import {set} from "firebase/database";
import {STORAGE} from "../../../../../../FirebaseConfig";

const PetViewItem = ({item}: any, {userRef}: any) => {
    console.log("ITEM:", item)
    const storageRef = strgRef(STORAGE)

    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    const {width} = useWindowDimensions();
    const [editView, setEditView] = useState<boolean>(false);
    const [fieldsUpdated, setFieldsUpdated] = useState<boolean>(false);

    const [name, setName] = useState(item.name);
    const [age, setAge] = useState(item.age);
    const [type, setType] = useState(item.type);
    const [breed, setBreed] = useState(item.breed);
    const [color, setColor] = useState(item.color);
    const [image, setImage] = useState(item.imageUrl);

    const [loading, setLoading] = useState(false);

    const handleChanges = () => {
        if (name !== item.name || age !== item.age || type !== item.type || breed !== item.breed || color !== item.color || image !== item.imageUrl) {
            setFieldsUpdated(true);
        } else {
            setFieldsUpdated(false);
        }
    }

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                `Sorry, we need camera roll permission to upload images.`
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }
    };

    const uriToBlob = async (uri: string) => {
        console.log("URI:", uri)
        const response = await fetch(uri);
        return await response.blob();
    };

    const updatePetObject = () => {
        setLoading(true)
        console.log(item)

        uriToBlob(image).then((blob) => {
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob!');
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    const petObject = [
                        {
                            id: 0,
                            name: name,
                            imageUrl: downloadURL
                        }, {
                            id: 1,
                            name: name,
                            age: age,
                            type: type,
                            breed: breed,
                            color: color,
                        }
                    ]

                    set(userRef, petObject).then(() => {
                        console.log("Pet object added successfully!")
                        setLoading(false)
                    }).catch((error) => {
                        console.log("Failed to add pet object:", error);
                        setLoading(false);
                    });
                }).catch((error) => {
                    console.log("Failed to get download URL", error);
                });
            }).catch((error) => {
                console.log("Error uploading file:", error);
                setLoading(false);
            });
        }).catch((error) => {
            console.log("Error converting URI to blob:", error);
            setLoading(false);
        });
    }

    useEffect(() => {
        handleChanges();
    }, [name, age, type, breed, color])

    return (
        <View style={[styles.container, {width}]}>
            {item.id === 1 ? (
                <View style={styles.petDetails}>

                    <View style={styles.header}>
                        <ThemedText style={styles.subTitle}>Pet details</ThemedText>
                        <TouchableOpacity onPress={() => setEditView(!editView)}>
                            <Edit style={styles.editIcon}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.petDetailsElement}>
                        <DogTag style={styles.icon}/>
                        <ThemedText style={styles.key}>Name: </ThemedText>
                        {!editView ? <ThemedText style={styles.value}>{item.name}</ThemedText>
                            : <TextInput
                                style={[styles.input, {color: textColor}]}
                                value={name}
                                onChangeText={name => setName(name)}
                                keyboardType="default"
                            />}
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Dog style={styles.icon}/>
                        <ThemedText style={styles.key}>Age: </ThemedText>
                        {!editView ? <ThemedText style={styles.value}>{item.age}</ThemedText>
                            : <TextInput
                                style={[styles.input, {color: textColor}]}
                                value={age}
                                onChangeText={age => setAge(age)}
                                keyboardType="numeric"
                            />}
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Breed style={styles.icon}/>
                        <ThemedText style={styles.key}>Breed: </ThemedText>
                        {!editView ? <ThemedText style={styles.value}>{item.breed}</ThemedText>
                            : <TextInput
                                style={[styles.input, {color: textColor}]}
                                value={breed}
                                onChangeText={breed => setBreed(breed)}
                                keyboardType="default"
                            />}
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Color style={styles.icon}/>
                        <ThemedText style={styles.key}>Color: </ThemedText>
                        {!editView ? <ThemedText style={styles.value}>{item.color}</ThemedText>
                            : <TextInput
                                style={[styles.input, {color: textColor}]}
                                value={color}
                                onChangeText={color => setColor(color)}
                                keyboardType="default"
                            />}
                    </View>

                    <View style={styles.petDetailsElement}>
                        <Paw style={styles.icon}/>
                        <ThemedText style={styles.key}>Type: </ThemedText>
                        {!editView ? <ThemedText style={styles.value}>{item.type}</ThemedText>
                            : <TextInput
                                style={[styles.input, {color: textColor}]}
                                value={type}
                                onChangeText={type => setType(type)}
                                keyboardType="default"
                            />}
                    </View>

                    {editView &&
                        <View style={styles.submitContainer}>
                            <View style={{flexDirection: "row", gap: 10}}>
                                <TouchableOpacity style={styles.button} onPress={pickImage}>
                                    <ThemedText>Update image</ThemedText>
                                </TouchableOpacity>
                                {image && <Check style={styles.icon}/>}
                            </View>
                            <TouchableOpacity
                                style={[styles.submitButton, fieldsUpdated ? styles.submitButtonEnabled : styles.submitButtonDisabled]}
                                disabled={!fieldsUpdated} onPress={updatePetObject}>
                                <ThemedText>Submit</ThemedText>
                            </TouchableOpacity>
                        </View>}

                </View>
            ) : (
                <View style={styles.petContainer}>
                    <ThemedText style={styles.title}>{item.name}</ThemedText>
                    <Image source={{uri: item.imageUrl}} style={styles.image}/>
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    submitContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 7,
    },
    button: {
        paddingHorizontal: 10,
        backgroundColor: "#646464",
        borderRadius: 5,
    },
    submitButton: {
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    submitButtonEnabled: {
        backgroundColor: "#34c759",
    },
    submitButtonDisabled: {
        backgroundColor: "rgba(52,199,89,0.47)",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#606060",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    image: {
        width: '95%',
        aspectRatio: 1,
        borderRadius: 10
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        textAlign: "center"
    },
    subTitle: {
        textAlign: "center",
        fontSize: 14,
        margin: 5,
    },
    petContainer: {
        justifyContent: "center",
        borderRadius: 20
    },
    petDetails: {
        backgroundColor: "#8c8c8c",
        width: '95%',
        height: '73.5%',
        marginTop: 50,
        borderRadius: 6,
        justifyContent: "flex-start",
    },
    petDetailsElement: {
        flexDirection: "row",
        backgroundColor: "#737373",
        padding: 10,
        borderTopColor: "#8c8c8c",
        borderTopWidth: 1,
    },
    icon: {
        marginRight: 10,
        marginTop: 5,
    },
    editIcon: {
        marginRight: 10,
    },
    key: {
        fontWeight: "bold",
    },
    value: {
        marginLeft: 'auto',
    },
    input: {
        width: "75%",
        padding: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginLeft: 'auto',
    }
});

export default PetViewItem;
