import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'HappyHour',
        headerStyle: {
          backgroundColor: '#ED8666',
        },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        title: 'HappyHour - Login',
        headerStyle: {
          backgroundColor: '#ED8666',
        },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: 'HappyHour - Cadastro',
        headerStyle: {
          backgroundColor: '#ED8666',
        },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
