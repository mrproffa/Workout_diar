// App.js
import 'react-native-gesture-handler'; // Lisää tämä ykköseen
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddExercise from './components/AddExercise'; // Tuo komponentit
import ExerciseList from './components/ExerciseList';
import Settings from './screens/Settings';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ExerciseList">
                <Stack.Screen name="ExerciseList" component={ExerciseList} />
                <Stack.Screen name="AddExercise" component={AddExercise} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
