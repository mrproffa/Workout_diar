// components/AddExercise.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons'; // Tuodaan ikonit

const AddExercise = ({ navigation, route }) => {
    const [exerciseType, setExerciseType] = useState('Juoksu');
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const addExerciseHandler = () => {
        const distanceNum = parseFloat(distance);
        const timeNum = parseFloat(time);

        // Tarkistetaan syötteet
        if (isNaN(distanceNum) || isNaN(timeNum)) {
            Alert.alert('Virhe', 'Matka ja kesto täytyy olla numeroita.');
            return;
        }
        if (distanceNum < 0 || timeNum < 0) {
            Alert.alert('Virhe', 'Matka ja kesto eivät voi olla negatiivisia.');
            return;
        }

        const newExercise = {
            type: exerciseType,
            distance: distanceNum,
            time: timeNum,
            date: date.toLocaleDateString(),
        };

        route.params.handleAddExercise(newExercise);
        navigation.navigate('ExerciseList');
    };

    const showDatePickerHandler = () => {
        setShowDatePicker(true);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    return (
        <View>
            <Picker selectedValue={exerciseType} onValueChange={(itemValue) => setExerciseType(itemValue)}>
                <Picker.Item label="Juoksu" value="Juoksu" />
                <Picker.Item label="Pyöräily" value="Pyöräily" />
                <Picker.Item label="Uinti" value="Uinti" />
            </Picker>

            <View style={styles.inputContainer}>
                <Icon name="walk" size={20} color="#000" />
                <TextInput 
                    placeholder="Matka (km)"
                    value={distance}
                    onChangeText={setDistance}
                    keyboardType="numeric"
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="timer" size={20} color="#000" />
                <TextInput 
                    placeholder="Aika (min)"
                    value={time}
                    onChangeText={setTime}
                    keyboardType="numeric"
                    style={styles.input}
                />
            </View>
            <Button title="Valitse päivämäärä" onPress={showDatePickerHandler} />

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <Button title="Lisää harjoitus" onPress={addExerciseHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        flex: 1,
    },
});

export default AddExercise;
