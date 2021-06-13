import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import AuthContext from '../../contexts/auth';
import { TextInput } from 'react-native-paper';
import { BACKEND } from '../../constants/index';

const SignIn = ({ navigation }) => {
  const { signed, signIn } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [status, setStatus] = useState('ativo');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();
    let url = `${BACKEND}/cadastro`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, nome, cpf, email, senha }),
    }).then((response) => console.log(response));
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require('../../assets/HappyHourLogoMobile.png')}
        />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          label="Nome"
          outlineColor="#645EAF"
          value={nome}
          onChangeText={(nome) => setNome(nome)}
        />
        <TextInput
          style={styles.input}
          outlineColor="#645EAF"
          label="CPF"
          value={cpf}
          onChangeText={(cpf) => setCpf(cpf)}
        />
        <TextInput
          style={styles.input}
          label="Email"
          outlineColor="#645EAF"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.input}
          label="Senha"
          outlineColor="#645EAF"
          value={senha}
          onChangeText={(senha) => setSenha(senha)}
        />
        <Button
          style={styles.buttonLogin}
          title="Cadastrar"
          color="#ED8666"
          onPress={(e) => handleSignUp(e)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  containerLogo: {
    marginBottom: 32,
  },
  logo: {
    width: 250,
    height: 250,
  },
  containerInput: {
    margin: 8,
  },
  input: {
    marginBottom: 8,
    borderRadius: 8,
  },
  buttonLogin: {
    marginTop: 8,
  },
  texto: {
    marginBottom: 32,
    marginTop: 8,
  },
});

export default SignIn;
