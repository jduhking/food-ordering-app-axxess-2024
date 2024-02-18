import { Stack } from "expo-router"

const AppLayout = () => {
  return (
     <Stack screenOptions={{
    headerShown: false
     }}>
      <Stack.Screen
      name="food/[id]"
      options={{
        presentation: 'fullScreenModal'
      }}
      />
    </Stack>
    )
}

export default AppLayout