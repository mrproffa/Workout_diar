import { FlatList, SafeAreaView } from "react-native";
import { Avatar, Card, Text, useTheme } from "react-native-paper";
import NewsContext from "./NewsContext";
import { useContext } from "react";
import Styles from "../styles/Styles";

export default function NewsListPage() {
    const theme = useTheme();
    const { news } = useContext(NewsContext);

    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={[Styles.header, { color: theme.colors.primary }]}>News list</Text>
            <FlatList
                data={news}
                renderItem={Item}
                keyExtractor={item => item.date + ":" + item.topic }
            />
        </SafeAreaView>
    );
}

function Item({ item }) {   
    return (
        <Card style={Styles.card}>
            <Card.Title 
                titleVariant="titleMedium"  
                title={item.topic + ' (' + item.date + ')' }
                left={props => <Avatar.Icon icon={item.category} size={40}/>}
            />
            <Card.Content>
                <Text>{item.msg}</Text>
            </Card.Content>
        </Card>
    );

}