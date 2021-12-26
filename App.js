import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './hooks/useAuth'
import StackNavigator from './StackNavigator'
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs() // ignore log notification by message

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  )
}
