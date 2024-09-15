import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './styles/Styles';
import { BottomNavigation, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import NewsContext from './components/NewsContext';
import NewsFormPage from './components/NewsFormPage';
import NewsListPage from './components/NewsListPage';

const routes = [
  {key: 'addnews', title: 'Add news', focusedIcon: 'email-newsletter'},
  {key: 'newslist', title: 'News', focusedIcon: 'format-list-bulleted'}
]

export default function App() {

  const [news, setNews] = useState([]);
  const [index, setIndex] = useState(0);
  
  const renderScene = BottomNavigation.SceneMap({
    addnews: NewsFormPage,
    newslist: NewsListPage,
  });

  return (
    <PaperProvider theme={MD3LightTheme}>
      <NewsContext.Provider value={{news, setNews}}>
        <BottomNavigation
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
      </NewsContext.Provider>
    </PaperProvider>

  );
}