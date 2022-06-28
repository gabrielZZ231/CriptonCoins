import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Modal,Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Input, Text } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';
import * as React from "react";
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Dimensions } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getMarketData } from './services/cryptoService';
import Lista from './componentes/Lista_coins';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
export default function App() {

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [modal,setmodal] = useState(false);
  const [text, setText] = useState('BTC');
  const [symbol, setSymbol] = useState('btc');
  const [coinsGrafichList, setcoinsGrafichList] = useState([0]);
  const [days, setdays] = useState(180);
  const [busca,setbusca] = useState(" ");
  const [updateData, setupdateData] = useState(true);

  const searchButton = <FontAwesome.Button
  name="search"
  size={24}
  color="black"
  backgroundColor="transparent"
  onPress={evt => setSymbol(text.toLowerCase())}
/>
 const bitcoin = <Icon
   rowing
   name='bitcoin'
   type='font-awesome' />

   const coin = <MaterialCommunityIcons
    name="hand-coin" 
    size={24} 
    color="black" />
  
   function addZero(number) {
    if (number <= 9) {
      return "0" + number;
    }
    return number;
  }
   function url(qtdDias) {
    const date = new Date();
    const listLastDays = qtdDias;
    const end_date = 
    `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
    date.setDate(date.getDate() - listLastDays);
    const start_date = 
    `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
    return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`;
  }

  
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData1(marketData);
    }
    fetchMarketData();
  }, [])


const modalAbrir = (item) => {
  setData(item)
  setmodal(true);
}

  return (
    <View style={styles.container}>
      <Header
        backgroundColor='#8B0000'
        placement="left"
        leftComponent={bitcoin}
        centerComponent={{ text: 'CriptoCoins 1.0', style: { color: 'black', fontWeight: "bold", fontSize: 20 } }}
      />
      <Input
        autoCapitalize='characters'
        leftIcon={coin}
        rightIcon={searchButton}
        value={text}
        onChangeText={setbusca}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={data1}
        renderItem={({ item }) => (
          <Lista
            nome={item.name}
            nome_cripto={item.symbol}
            precoAtual={item.current_price}
            precoPorcentagem={item.price_change_percentage_7d_in_currency}
            logoUrl={item.image}
            onPress={() => modalAbrir(item,item.id)}
          />
        )}
              />
        <Modal
          animationType='slide'
          transparent={true}
          visible={modal}
        >
          <View style={styles.modal}>
            <Text style={{ color: 'red' }}> saadasd {data.high_24h} </Text>
            <Text style={{ color: 'red' }}> adsdsdas{data.low_24h}</Text>
          <Button
            title = "Fechar"
            onPress = {()=>{setmodal(false)}}
          />
          </View>

        </Modal>
      
      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // marginTop: 40,
    // margin: 20,
    alignContent: 'center'
  },
  modal:{
    flex: 1,
    alignItems: 'center',
    padding: 50,
    backgroundColor:"black",
    marginTop:"90%",
    fontWeight: 'bold',
    fontSize: 24,
    color:"white"
  },

  rotulo: {
    fontWeight: 'bold',
    fontSize: 24
  },
  conteudo: {
    fontSize: 24
  },
  linha: {
    flexDirection: 'row',
    width: '100%'
  }
});
