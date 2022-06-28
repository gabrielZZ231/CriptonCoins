import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Modal,Button } from 'react-native';
import { useState, useEffect } from 'react';
import {  Text } from 'react-native-elements';
import * as React from "react";
import { Header } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getMarketData } from './services/cryptoService';
import Lista from './componentes/Lista_coins';
export default function App() {

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [modal,setmodal] = useState(false);

  
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
        centerComponent={{ text: 'CriptoCoins 1.0', style: { color: 'black', fontWeight: "bold", fontSize: 20 } }}
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
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}> Alta nas últimas 24 horas: {data.high_24h} </Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}> Baixa nas últimas 24 horas: {data.low_24h}</Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}> Preço atual: {data.current_price}</Text>
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
