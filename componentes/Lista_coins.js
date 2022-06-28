import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const Lista = ({ nome, nome_cripto, precoAtual, precoPorcentagem, logoUrl, onPress }) => {
  const corPreco = precoPorcentagem > 0 ? '#34C759' : '#FF3B30';

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.item}>
        
        <View style={styles.conteinerEsquerdo}>
          <Image source={{ uri: logoUrl }} style={styles.imagem} />
          <View style={styles.container_titulo}>
            <Text style={styles.titulo}>{ nome}</Text>
            <Text style={styles.subtitulo}>{nome_cripto.toUpperCase()}</Text>
          </View>
        </View>

        
        <View style={styles.ContainerDireito}>
          <Text style={styles.titulo}>${precoAtual.toLocaleString('en-US', { currency: 'USD' })}</Text>
          <Text style={[styles.subtitulo, {color: corPreco}]}>{precoPorcentagem.toFixed(2)}%</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  conteinerEsquerdo: {
    flexDirection: "row",
    alignItems: 'center',
  },
  imagem: {
    height: 48,
    width: 48,
  },
  container_titulo: {
    marginLeft: 8,
  },
  titulo: {
    fontSize: 18,
  },
  subtitulo: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9ABB1",
  },
  containerDireito: {
    alignItems: 'flex-end',
  },
})

export default Lista