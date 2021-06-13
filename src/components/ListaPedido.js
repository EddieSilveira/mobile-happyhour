import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { BACKEND } from '../constants/index';

const ListaPedido = ({ navigation, data, setListar, setNovoPedido }) => {
  let produtos = data.produtos.map((item) => item);
  const [nomePedido, setNomePedido] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  async function editarPedido() {
    let url = `${BACKEND}/pedido/`;

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: data._id,
        produtos: [
          {
            nomePedido: nomePedido,
            quantidade: quantidade,
            preco: preco,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNovoPedido(true);
        setListar(false);
        alert(data.message);
      })
      .catch(function (error) {
        console.error(
          'Houve um problema ao excluir o pedido: ' + error.message,
        );
      });
  }
  async function excluirPedido() {
    let url = `${BACKEND}/pedido/${data._id}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNovoPedido(true);
        setListar(false);
        alert('Pedido excluído com sucesso!');
      })
      .catch(function (error) {
        console.error(
          'Houve um problema ao excluir a categoria: ' + error.message,
        );
      });
  }

  return (
    <View style={styles.containerLista}>
      <Text style={styles.textoPedido}>
        Número do pedido: {data.numeroPedido}
      </Text>

      {produtos.map((item) => {
        return (
          <View key={data._id}>
            <TextInput
              style={styles.input}
              outlineColor="#645EAF"
              label="Nome do Produto"
              value={nomePedido}
              onChangeText={(nomePedido) => setNomePedido(nomePedido)}
            />
            <TextInput
              style={styles.input}
              outlineColor="#645EAF"
              label="Quantidade"
              value={quantidade}
              onChangeText={(quantidade) => setQuantidade(quantidade)}
            />
            <TextInput
              style={styles.input}
              outlineColor="#645EAF"
              label="Preço"
              value={preco}
              onChangeText={(preco) => setPreco(preco)}
            />
            <Text
              style={styles.textoPedido}
            >{`Nome do produto: ${item.nome} Quantidade:${item.quantidade} Preço:${item.valorUnidade}`}</Text>
          </View>
        );
      })}
      <Text style={styles.textoPedido}>
        Valor do pedido: {data.valorPedido}
      </Text>
      <Button
        style={styles.buttonLista}
        title="Editar"
        icon="login-variant"
        mode="contained"
        color="#968E7A"
        onPress={() => editarPedido()}
      >
        Editar
      </Button>
      <Button
        style={styles.buttonLista}
        title="Excluir"
        icon="login-variant"
        mode="contained"
        color="#968E7A"
        onPress={() => excluirPedido()}
      >
        Excluir
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLista: {
    marginHorizontal: '4%',
    marginVertical: '2%',
  },
  textoPedido: {
    fontSize: 18,
    width: '100%',
  },
  buttonLista: {
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#ED8666',
    color: '#968E7A',
  },
});
export default ListaPedido;
