import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import React from 'react'
import { StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';


type CustomHeaderProps = {
    title: string;
    navigation: DrawerNavigationProp<ParamListBase>;
    buttonRegister: string | undefined;
};

const _handleMore = () => console.log('Shown more');


export default function CustomHeader({ title, navigation, buttonRegister = undefined }: CustomHeaderProps) {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#6200ea" />
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
                <Appbar.Content title={title} />
                {buttonRegister && (
                    <Appbar.Action icon="plus" onPress={() => navigation.navigate(buttonRegister)} />
                )}

                
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />


            </Appbar.Header>
        </>
    )
}