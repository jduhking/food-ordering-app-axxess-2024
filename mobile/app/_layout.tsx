import { useAppStore } from '@/state/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {

  const patient = useAppStore((state) => state.patient);
  const router = useRouter();
  useEffect(() => {
    setInitialLayout();
  }, [patient])
  const setInitialLayout = async () => {
    
      if(patient){ 
        router.replace('/home/')
      } else {
        router.replace('/login')
      }

  };

  return <Slot />
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/Rubik.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
    
    <RootLayoutNav />
  </>
  );
}

function RootLayoutNav() {


  return (
      <InitialLayout />
  );
}
