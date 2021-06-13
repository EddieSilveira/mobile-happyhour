import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const CardProduto = ({ titulo, categoria, valor, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTextProduto}>
        <View style={styles.containerTituloProduto}>
          <Text style={styles.textoTitulo}>{titulo}</Text>
        </View>
        <View style={styles.containerDescricaoProduto}>
          <Text style={styles.texto}>{categoria}</Text>
          <Text>R$ {valor}</Text>
        </View>
      </View>
      <View style={styles.containerButtonProduto}>
        <Button
          style={styles.buttonCarrinho}
          icon="cart-outline"
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#A5A5A5',
    borderRadius: 12,
    margin: 7,
    marginTop: 24,
  },
  textoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 8,
  },
  texto: {
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    fontWeight: 'bold',
  },
  buttonCarrinho: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 24,
    paddingLeft: 12,
    backgroundColor: '#645EAF',
  },
  containerTituloProduto: {
    height: 70,
    justifyContent: 'center',
    textAlign: 'center',
  },
  containerDescricaoProduto: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  containerButtonProduto: {
    flex: 1,
  },
});
export default CardProduto;
