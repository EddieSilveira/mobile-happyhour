import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import AuthContext from '../../contexts/auth';
import { TextInput } from 'react-native-paper';

const SignIn = ({ navigation }) => {
  const { signed, signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSignIn() {
    signIn(email, senha);
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
          outlineColor="#645EAF"
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          label="Senha"
          outlineColor="#645EAF"
          value={senha}
          secureTextEntry={true}
          onChangeText={(senha) => setSenha(senha)}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.texto}>Ainda não possui cadastro?</Text>
          <View style={{ margin: 4 }}>
            <Button
              mode="text"
              title="Cadastre-se"
              color="#ED8666"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
        <Button
          style={styles.buttonLogin}
          title="Login"
          color="#ED8666"
          onPress={handleSignIn}
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
