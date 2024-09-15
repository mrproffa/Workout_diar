import { SafeAreaView, View } from "react-native";
import { Button, Text, TextInput, ToggleButton, useTheme } from "react-native-paper";
import Styles from "../styles/Styles";
import { useContext, useState } from "react";
import NewsContext from "./NewsContext";


const categories = ['weather-lightning-rainy', 'swim', 'music-clef-treble'];


export default function NewsFormPage() {

    const [category, setCategory] = useState(categories[0]);
    const [topic, setTopic] = useState('');
    const [msg, setMsg] = useState('');
    const theme = useTheme();
    const {news, setNews} = useContext(NewsContext);
    
    function addNews(){
        const modified = [...news, {category, topic, msg, date: new Date().toDateString()}];
        setNews(modified);
    }

    return (
        <SafeAreaView style={[Styles.container, {backgroundColor: theme.colors.background}]}>
            <Text variant="headlineLarge" style={[Styles.header, {color: theme.colors.primary }]}>ADD NEWS</Text>
            <CategorySelection value={category} setValue={setCategory} values={categories} />
            <TextInput label={'Topic'} style={Styles.textInput} mode="flat" value={topic} onChangeText={setTopic}/>
            <TextInput  label={'News message'} style={[Styles.textInput, Styles.multiline]} mode="flat" multiline value={msg} onChangeText={setMsg}/>
            <Button mode="contained" style={Styles.button} onPress={addNews}>Add news</Button>
        </SafeAreaView>
    );
}


function CategorySelection({ value, setValue, values }) {

    const theme = useTheme();

    return (
        <View style={Styles.categories}>
            <ToggleButton.Group value={value} onValueChange={setValue} >
                {values.map(v => 
                    <ToggleButton 
                        key={v} 
                        value={v} 
                        icon={v} 
                        iconColor={v==value ? theme.colors.onPrimary : theme.colors.primary} 
                        size={30} 
                        style={{backgroundColor: v == value ? theme.colors.primary : null}}
                    />
                )}
            </ToggleButton.Group>
        </View>
    );
}