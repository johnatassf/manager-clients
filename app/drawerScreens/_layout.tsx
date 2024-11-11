import React from 'react'
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import ManagerClientList from '../manager-list/ManagerClientList';
import CustomHeader from '@/components/menu/Header';

export default function DrawerScreens() {
    const DrawerNavigator = createDrawerNavigator();
    return <>
        <DrawerNavigator.Navigator>
            <DrawerNavigator.Screen
                name="manager-list"
                component={ManagerClientList}
                options={{
                    drawerLabel: 'ManagerClient',
                    title: 'Overview',
                    header: ({ navigation }) => (
                        <CustomHeader title="Manager Client" navigation={navigation} buttonRegister="manager-client" />
                    ),
                }}
            />
        </DrawerNavigator.Navigator>
    </>
}
