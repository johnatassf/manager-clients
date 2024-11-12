import { DarkTheme, DefaultTheme } from '@react-navigation/native';
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
import { configureFonts, MD2LightTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import Colors from './../assets/theme/Colors.json'



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



  const fontConfig = {
    web: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    ios: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    android: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    }
  } as const;

  const colorSchema = useColorScheme();

  const customDarkTheme = { ...MD3DarkTheme, colors: Colors.colorsDark};
  const customLightTheme = { ...MD3LightTheme, colors: Colors.colorsLight };

 
let theme = colorSchema === 'dark' ? customDarkTheme : customLightTheme;
 

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

