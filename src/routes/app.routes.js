import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        title: 'HappyHour',
        headerStyle: {
          backgroundColor: '#ED8666',
        },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  </AppStack.Navigator>
);

export default AppRoutes;
