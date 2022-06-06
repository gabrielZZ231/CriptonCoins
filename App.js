import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { useState, useEffect } from 'react';
import { Input, Text } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as React from "react";
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart} from "react-native-chart-kit";
import { Dimensions } from 'react-native'


export default function App() {
  
  const [dataname, setDataName] = useState([]);
  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt');
  const [coinsGrafichList, setcoinsGrafichList] = useState([0]);
  const [days, setdays] = useState(180);
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
    const date = new Date();

   function url(qtdDias) {
    const listLastDays = qtdDias;
    const end_date = 
    `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
    date.setDate(date.getDate() - listLastDays);
    const start_date = 
    `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
    return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}`;;
  }

  async function getPriceCoinsGraphic(url) {
    let responseG = await fetch(url);
    let returnApiG = await responseG.json();
    let selectListQuotationsG = returnApiG.bpi;
    const queryCoinsListG = Object.keys(selectListQuotationsG).map((key) => {
      return selectListQuotationsG[key];
    });
    let dataG = queryCoinsListG;
    return dataG;
  }

useEffect(() => {
  getPriceCoinsGraphic(url(days)).then((dataG) => {
    setcoinsGrafichList(dataG);
  });
  if (updateData) {
    setupdateData(false);
  }
}, [updateData]);


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
        leftIcon={coin }
        rightIcon={searchButton}
        value={text}
        onChangeText={setText}
      />
      <View style={styles.linha}>
     {/* <Text>{dataname.vol}</Text> */}


      <Text style={styles.rotulo}></Text>

        {/* <Text style={styles.rotulo}>Preço Atual: </Text>
        <Text style={styles.conteudo}>{data.c}</Text> */}
      </View>
      <View style={styles.linha}>
        {/* <Text style={styles.rotulo}>Variação %: </Text>
        <Text style={styles.conteudo}>{data.P}%</Text> */}
      </View>
      <View style={styles.linha}>
        {/* <Text style={styles.rotulo}>Volume: </Text>
        <Text style={styles.conteudo}>{data.v}</Text> */}
      </View>
      <View>
      <LineChart   data={{
        labels: ['Janeiro', 'Fevereiro', 'Março' ,'Abril' ,'Maio', 'Junho'],
        datasets: [{
          data: coinsGrafichList,
        }]
      }}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      yAxisLabel="$"
        yAxisSuffix="k"
        withVerticalLines={false}
        yLabelsOffset={1}
        withVerticalLabels={true}
      chartConfig={{
        backgroundColor: "#000000",
        backgroundGradientFrom: "#232323",
        backgroundGradientTo: "#3F3F3F",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "1",
          strokeWidth: "1",
          stroke: "#f50d41",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
  />
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
