import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

const AppLayout = () => {
  return (
     <Stack screenOptions={{
    headerShown: false
   }}/>
    )
}

export default AppLayout