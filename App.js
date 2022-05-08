import React, { useState, useEffect } from "react";
import { View, FlatList, SafeAreaView, StatusBar, StyleSheet,
  Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Image source={{uri:item.url}} style={{height:50, width:50, padding:5}} />
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    fetch('http://jsonplaceholder.typicode.com/albums')
    .then((response)=>response.json())
    .then((json)=>setData(json))
    .finally(()=>setIsLoading(false));

    },[]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#7fffd4" : "#00ffff";

    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id); alert("The Second Page shows the album info");}}
        style={{ backgroundColor }}
      />
    );
  };

  return (

    <SafeAreaView style={styles.container}>
    {isLoading ? <Text>Loading</Text> :
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex:1,
    flexDirection:'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
