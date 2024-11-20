import React from 'react'
import { Button, Card, Text } from 'react-native-paper'
import { View, TextInput, StyleSheet } from "react-native";
import { Controller, useForm } from 'react-hook-form';
import {
    useNavigation,
} from '@react-navigation/native';
import Constants from 'expo-constants';



function _layout() {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const navigation = useNavigation();

    const apiUrl = Constants.expoConfig.extra.apiUrl;


    const onSubmit = () => {
        console.log(apiUrl);
        navigation.navigate('drawerScreens')
    }

    return (
        <View style={styles.container}>
            <Card style={styles.cardLogin} className='w-'>
                <Text style={styles.title}>Login</Text>
                <Controller
                    control={control}
                    name="Email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            placeholder="Email"
                            style={styles.input}
                            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="Password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            placeholder="Password"
                            style={styles.input}
                            secureTextEntry
                            {...register("password")}
                        />
                    )}
                />
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={onSubmit}>Login</Button>
                </View>
            </Card>
        </View>
    );
}

export default _layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',

    },
    cardLogin: {

        padding: 20,
        borderRadius: 8,
        elevation: 5,
        height: '50%',
        justifyContent: 'center',
        width: '25%',
        minWidth: 200
    },
    title: {
        fontSize: 24,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        color: 'black',
    },
    buttonContainer: {
        marginTop: 10,
    },
});