import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import * as React from "react";
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';


export default function App() {

  const [data, setData] = useState({})
  const [text, setText] = useState('BTCUSDT')
  const [symbol, setSymbol] = useState('btcusdt')

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => {
      if (lastJsonMessage) {
        setData(lastJsonMessage)
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true,
    reconnectInterval: 10000
  })

 
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
  
   const coin = <Icon 
   rowing
   name="hands-holding-dollar"
   type='font-awesome'
   /> 
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
        leftIcon={hands-holding-dollar}
        rightIcon={searchButton}
        value={text}
        onChangeText={setText}
      />
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Preço Atual: </Text>
        <Text style={styles.conteudo}>{data.c}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Variação %: </Text>
        <Text style={styles.conteudo}>{data.P}%</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Volume: </Text>
        <Text style={styles.conteudo}>{data.v}</Text>
      </View>
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
