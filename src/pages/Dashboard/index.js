import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import AuthContext from '../../contexts/auth';
import { BACKEND } from '../../constants/index';
import { Avatar, Button, TextInput } from 'react-native-paper';

import ListaPedido from '../../components/ListaPedido';

const Dashboard = ({ navigation }) => {
  const { signed, signIn, usuario, signOut } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState(true);
  const [listar, setListar] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState('');
  const [nomePedido, setNomePedido] = useState('');
  const [quantidadePedido, setQuantidadePedido] = useState('');
  const [valorUnidadePedido, setValorUnidadePedido] = useState('');
  const [valorPedido, setValorPedido] = useState('');
  const filtro = usuario._id;

  useEffect(() => {
    async function getPedidos() {
      const url = `${BACKEND}/pedido`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setPedidos(data));
    }
    getPedidos();

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    setNumeroPedido(getRandom(1, 1000).toFixed(0));
  }, [novoPedido]);

  useEffect(() => {
    setValorPedido(quantidadePedido * valorUnidadePedido);
  }, [valorUnidadePedido]);

  const pedidosFiltrados = () => {
    if (pedidos) {
      pedidos.filter(function (item) {
        if (item.idUsuario === filtro) return item;
      });
    }
  };

  async function fazerPedido() {
    let pedido = {
      numeroPedido: numeroPedido,
      idUsuario: usuario._id,
      produtos: [
        {
          nome: nomePedido,
          quantidade: quantidadePedido,
          valorUnidade: valorUnidadePedido,
        },
      ],
      valorPedido: valorPedido,
    };

    let url = `${BACKEND}/pedido`;
    fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar(true);
        setNovoPedido(false);
      });
  }

  async function handleSignOut() {
    signOut();
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerButtonTopo}>
        <Button
          style={styles.buttonTopo}
          mode="contained"
          onPress={() => {
            setNovoPedido(true);
            setListar(false);
          }}
        >
          Novo
        </Button>
        <Button
          style={styles.buttonTopo}
          mode="contained"
          onPress={() => {
            setListar(true);
            pedidosFiltrados();
            setNovoPedido(false);
          }}
        >
          Listar
        </Button>
      </View>
      <View style={styles.containerAvatar}>
        <Avatar.Image size={100} source={require('../../assets/avatar.png')} />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.texto}>Seja bem vindo, {usuario.nome}!</Text>
        <Text style={styles.texto}>Email: {usuario.email}</Text>
      </View>
      {/* Novo Pedido */}
      {novoPedido && (
        <View>
          <Text style={styles.titulo}>Novo Pedido</Text>
          <TextInput
            style={styles.input}
            outlineColor="#645EAF"
            label="Nome do Produto"
            value={nomePedido}
            onChangeText={(nome) => setNomePedido(nome)}
          />
          <TextInput
            style={styles.input}
            outlineColor="#645EAF"
            label="Quantidade"
            value={quantidadePedido}
            onChangeText={(quantidade) => setQuantidadePedido(quantidade)}
          />
          <TextInput
            style={styles.input}
            outlineColor="#645EAF"
            label="Valor"
            value={valorUnidadePedido}
            onChangeText={(valor) => setValorUnidadePedido(valor)}
          />
          <Button
            style={styles.buttonFazerPedido}
            title="Pedido"
            icon="login-variant"
            mode="contained"
            onPress={() => fazerPedido()}
          >
            Fazer Pedido
          </Button>
          <Button
            style={styles.buttonFazerPedido}
            title="Logout"
            icon="login-variant"
            mode="contained"
            onPress={() => handleSignOut()}
          >
            Logout
          </Button>
        </View>
      )}
      {/* Listar Pedidos */}
      {listar && (
        <View>
          <Text style={styles.titulo}>Listar Pedidos Anteriores</Text>
          <FlatList
            data={pedidos}
            renderItem={({ item }) => (
              <ListaPedido
                data={item}
                setNovoPedido={setNovoPedido}
                setListar={setListar}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      )}
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

    borderRadius: 8,
    backgroundColor: '#ED8666',
  },
  containerInfo: {
    height: 80,
    backgroundColor: '#FEFEFE',
    alignItems: 'center',
  },
  containerAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBottom: {
    margin: 16,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#ED8666',
    color: '#968E7A',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: '2%',
  },
  input: {
    marginVertical: '1%',
  },
  buttonFazerPedido: {
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#ED8666',
    color: '#968E7A',
  },
});

export default Dashboard;
