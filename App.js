import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Modal, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Text } from 'react-native-elements';
import * as React from "react";
import { Header } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getMarketData } from './services/cryptoService';
import Lista from './componentes/Lista_coins';
export default function App() {

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [modal, setmodal] = useState(false);


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
            onPress={() => modalAbrir(item, item.id)}
          />
        )}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modal}
      >
        <View style={styles.modal}>
          <Image
            style={styles.imagem}
            source={{uri:data.image}}
          />
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, margin: 10 }}> Alta nas últimas 24 horas: $ {data.high_24h} </Text>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20,margin: 10 }}> Baixa nas últimas 24 horas: $ {data.low_24h}</Text>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, margin: 10 }}> Diferença nas 24 horas: $ {data.price_change_24h.toFixed(6)}</Text>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, margin: 10 }}> Volume: V {data.total_volume}</Text>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, margin: 10 }}> Preço atual: $ {data.current_price}</Text>
          <Button
            title="Fechar"
            onPress={() => { setmodal(false) }}
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
  modal: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    backgroundColor: "gold",
    marginTop: "90%",
    fontWeight: 'bold',
    fontSize: 24,
    color: "white",
    borderRadius: 3,
  },

  imagem: {
    width: 100,
    height: 100,
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
