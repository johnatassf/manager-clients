import { DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterClienteModal from './manager-list/registerClienteModal';
import DrawerScreens from './drawerScreens/_layout';
import "./../global.css"
import { PaperProvider } from 'react-native-paper';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const StackNavigator = createNativeStackNavigator();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };




  return (
    <PaperProvider theme={theme}>
        <StackNavigator.Navigator
          screenOptions={{
            headerShown: false, // Ocultar cabeçalhos padrão para o stack
          }}
        >
          {/* Drawer Navigator para as telas regulares */}
          <StackNavigator.Screen name="drawerScreens" component={DrawerScreens} />

          {/* Modal Manager Client */}
          <StackNavigator.Screen
            name="manager-client"
            component={RegisterClienteModal}
            options={{
              presentation: 'modal', // Define como modal
              headerShown: false, // Se você não quiser cabeçalho no modal
            }}
          />
        </StackNavigator.Navigator>

    </PaperProvider>

  );


}

