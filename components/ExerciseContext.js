import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  const addExercise = (exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};
