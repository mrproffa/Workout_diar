// components/ExerciseList.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const ExerciseList = ({ navigation }) => {
    const [exercises, setExercises] = useState([]);

    const addExercise = (newExercise) => {
        setExercises((prevExercises) => [...prevExercises, newExercise]);
    };

    const handleAddExercise = (newExercise) => {
        addExercise(newExercise);
        navigation.navigate('ExerciseList');
    };

    const calculateDistances = () => {
        const distances = {};
        exercises.forEach(exercise => {
            if (distances[exercise.type]) {
                distances[exercise.type] += exercise.distance;
            } else {
                distances[exercise.type] = exercise.distance;
            }
        });
        return distances;
    };

    const distances = calculateDistances();

    return (
        <View style={styles.container}>
            <Button
                title="Lisää uusi harjoitus"
                onPress={() => navigation.navigate('AddExercise', { handleAddExercise })}
            />
            <Text style={styles.header}>Yhteensä matkat:</Text>
            {Object.keys(distances).map((key) => (
                <Text key={key} style={styles.distanceText}>
                    {key}: {distances[key].toFixed(2)} km
                </Text>
            ))}
            <FlatList 
                data={exercises}
                renderItem={({ item }) => (
                    <Text style={styles.exerciseText}>
                        {item.type}: {item.distance} km, {item.time} min, Päivämäärä: {item.date}
                    </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    distanceText: {
        fontSize: 18,
        marginVertical: 5,
    },
    exerciseText: {
        fontSize: 16,
        marginVertical: 5,
    },
});

export default ExerciseList;
