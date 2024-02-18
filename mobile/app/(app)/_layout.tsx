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
        <Stack.Screen
      name="shopping-cart/index"
      options={{
        title: "shopping-cart",
        presentation: 'fullScreenModal'
      }}
      />
    </Stack>
    )
}

export default AppLayout