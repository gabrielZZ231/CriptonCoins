import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Modal,Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Input, Text } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';
import * as React from "react";
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { LineChart} from "react-native-chart-kit";
import { Dimensions } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getMarketData } from './services/cryptoService';
import Lista from './componentes/Lista_coins';

export default function App() {
  
  const coins = ["AAVE",  "ACMFT",
  "ACORDO01",
  "ADA",
  "ADS",
  "AGIX",
  "AIOZ",
  "ALCX",
  "ALGO",
  "ALICE",
  "ALLFT",
  "ALPHA",
  "AMFT",
  "AMP",
  "ANKR",
  "ANT",
  "APE",
  "API3",
  "ARGFT",
  "ASRFT",
  "ATLAS",
  "ATMFT",
  "ATOM",
  "AUDIO",
  "AVAX",
  "AXS",
  "BADGER",
  "BAL",
  "BAND",
  "BARFT",
  "BAT",
  "BCH",
  "BICO",
  "BLZ",
  "BNT",
  "BTC",
  "BTRST",
  "CAIFT",
  "CEEK",
  "CHZ",
  "CITYFT",
  "CLV",
  "COMP",
  "COTI",
  "CRV",
  "CSCONS01",
  "CSCONS02",
  "CTSI",
  "CVC",
  "CVX",
  "DAI",
  "DG",
  "DIA",
  "DOGE",
  "DOT",
  "DPI",
  "DYDX",
  "ENJ",
  "ENS",
  "ETH",
  "FARM",
  "FET",
  "FIL",
  "FLOKI",
  "GALA",
  "GALFT",
  "GALOFT",
  "GHST",
  "GMT",
  "GNO",
  "GODS",
  "GRT",
  "GST",
  "HIGH",
  "HOT",
  "ICP",
  "ILV",
  "IMOB01",
  "IMOB02",
  "IMX",
  "INTERFT",
  "JASMY",
  "JUVFT",
  "KEEP",
  "KNC",
  "KP3R",
  "LDO",
  "LINK",
  "LOOKS",
  "LPT",
  "LQTY",
  "LRC",
  "LTC",
  "MANA",
  "MATIC",
  "MBCCSH01",
  "MBCCSH02",
  "MBCCSH03",
  "MBCONS01",
  "MBCONS02",
  "MBFP01",
  "MBFP02",
  "MBFP03",
  "MBFP04",
  "MBFP05",
  "MBFP06",
  "MBFP07",
  "MBPRK01",
  "MBPRK02",
  "MBPRK03",
  "MBPRK04",
  "MBPRK05",
  "MBPRK06",
  "MBPRK07",
  "MBSANTOS01",
  "MBVASCO01",
  "MC",
  "MCO2",
  "MENGOFT",
  "METIS",
  "MINA",
  "MIR",
  "MKR",
  "MPL",
  "MVI",
  "NAVIFT",
  "NFT00",
  "NFT10",
  "NFT11",
  "NFT12",
  "NFT13",
  "NFT14",
  "NFT15",
  "NFT16",
  "NFT17",
  "NFT18",
  "NFT19",
  "NFT2",
  "NFT20",
  "NFT21",
  "NFT22",
  "NFT23",
  "NFT24",
  "NFT25",
  "NFT26",
  "NFT27",
  "NFT28",
  "NFT29",
  "NFT3",
  "NFT30",
  "NFT31",
  "NFT32",
  "NFT33",
  "NFT34",
  "NFT35",
  "NFT36",
  "NFT37",
  "NFT4",
  "NFT5",
  "NFT6",
  "NFT7",
  "NFT8",
  "NFT9",
  "NFTI",
  "NFTOKN01",
  "OCEAN",
  "OGFT",
  "OGN",
  "OMG",
  "OPUL",
  "OXT",
  "PAXG",
  "PERP",
  "PFLFT",
  "PLA",
  "POLS",
  "POLY",
  "PORFT",
  "POWR",
  "PSGFT",
  "QNT",
  "RACA",
  "RAD",
  "RARE",
  "RARI",
  "REN",
  "REQ",
  "RLY",
  "RNDR",
  "ROSE",
  "SACI",
  "SAND",
  "SAUBERFT",
  "SCCPFT",
  "SDAO",
  "SHIB",
  "SKL",
  "SLP",
  "SNX",
  "SOL",
  "SPELL",
  "SPFCFT",
  "SRM",
  "STG",
  "STORJ",
  "STVFT",
  "STX",
  "SUPER",
  "SUSHI",
  "SYN",
  "THFT",
  "TLM",
  "TRB",
  "TRU",
  "UFCFT",
  "UMA",
  "UNI",
  "USDC",
  "USDP",
  "VERDAO",
  "VSPRK01",
  "WBTC",
  "WBX",
  "WLUNA",
  "XLM",
  "XRP",
  "XTZ",
  "YBOFT",
  "YFI",
  "YGG",
  "ZRX",
  "FTBRL"]
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
  
  //const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/@ticker`,{
      // onMessage: () => {
        // if(lastJsonMessage) {
            // setData(lastJsonMessage)
        // }
      // },
      // onError: (event) => alert(event),
      // shouldReconnect: () => true,
      // reconnectInterval: 3000
  //})
    
  //https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30
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

const modalAbrir = (item) => {
  setcoinsGrafichList(item);
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
            onPress={() => modalAbrir(item)}
          />
        )}
              />
        <Modal
          animationType='slide'
          transparent={true}
          visible={modal}
        >
          <View style={styles.modal}>
            <LineChart   data={{
              labels: ['Janeiro', 'Fevereiro', 'Março' ,'Abril' ,'Maio', 'Junho'],
              datasets: [{
                data: coinsGrafichList,
              }]
            }}
            width={Dimensions.get('window').width}
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
              decimalPlaces: 0, 
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
              borderRadius: 16,
            }}
          />
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
    padding: 100,
    marginTop:"50%"
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
