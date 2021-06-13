import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthContext from '../../contexts/auth';
import { BACKEND } from '../../constants/index';

import CardProduto from '../../components/CardProduto';
import { Button, Card } from 'react-native-paper';

const Home = ({ navigation }) => {
  const { signed, signIn, usuario } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function getProdutos() {
      const url = `${BACKEND}/produtos`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setProdutos(data));
    }
    getProdutos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerButtonTopo}>
        <Button
          style={styles.buttonTopo}
          icon="glass-mug"
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Cerveja
        </Button>
        <Button
          style={styles.buttonTopo}
          icon="bottle-soda-outline"
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Drinks
        </Button>
      </View>
      <View style={styles.containerProduto}>
        {produtos &&
          produtos.map((item, index) => {
            if (index < 4) {
              return (
                <CardProduto
                  key={item._id}
                  navigation={navigation}
                  titulo={item.nome}
                  categoria={item.categoria}
                  valor={item.valor}
                />
              );
            }
          })}
      </View>
      <Button
        style={styles.buttonBottom}
        icon="login-variant"
        mode="contained"
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.texto}>Fazer Pedido</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  containerButtonTopo: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#FEFEFE',
  },
  buttonTopo: {
    width: '40%',
    margin: 8,
    padding: 8,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#ED8666',
  },
  containerProduto: {
    height: 500,
    backgroundColor: '#FEFEFE',
    padding: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonBottom: {
    margin: 16,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#ED8666',
    color: '#968E7A',
  },
  texto: {
    fontWeight: 'bold',
  },
});

export default Home;
