import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListScreen from './components/ListScreen';
import UpdateScreen from './components/UpdateScreen';
import AddScreen from './components/AddScreen';
import BookDetailsScreen from './components/ScreenDetail';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="list" component={ListScreen}  options={{ title: 'List of Books' }} />
        <Drawer.Screen name="add" component={AddScreen}  />
        <Drawer.Screen name="update" component={UpdateScreen} />
        <Drawer.Screen name="BookDetails" component={BookDetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
