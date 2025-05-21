//Aplicativo criado com interface gráfica para usuário cadastrar e buscar livros, menu de navegação lateral e importação da lista em pdf.
//Antes de iniciar o projeto, é necessário criar o banco no site do Firebase.
//Já criei o projeto de teste com a conexão do db salvo em firebaseConfig.js, criado com a minha conta do Gmail.
//Criado por Yndianara Santos

// Necessário a instalação:
//•	npx expo start
//•	npx expo install firebase
//•	npx expo install expo-navigation-bar
//•	npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
//•	npx expo install expo-image

// Importaçoes de bibliotecas do React e dependências:
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { ThemeContext } from './themeContext';


//Páginas linkadas aqui
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import ListaCompletaScreen from './screens/ListaCompletaScreen';
import AjudaScreen from './screens/AjudaScreen';
import SobreScreen from './screens/SobreScreen';

//Navegação entre páginas com o Stack e Drawer
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack com navegação interna e de forma oculta, para não duplicar o título e simplificar a interface
function HomeStack() {
  return (
    <Stack.Navigator style={style.nav} >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Resultados" component={ResultScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

//Página de navegação do Drawer com aplicativos 
export default function App() {
  const scheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          initialRouteName="Início"
          screenOptions={({ route }) => ({
            drawerIcon: ({ color , size }) => {
              let iconName;
              switch (route.name) {
                case 'Início':
                  iconName = 'home';
                  break;
                case 'Listagem Completa':
                  iconName = 'library-sharp';
                  break;
                case 'Busca':
                  iconName = 'airplane'
                case 'Ajuda':
                  iconName = 'help-circle';
                  break;
                case 'Sobre':
                  color = 'red';
                  iconName = 'bug-sharp';
                  break;
                default:
                  iconName = 'ellipsis-horizontal-outline';
              }
              return <Ionicons name={iconName} size={30} color={'#990099'} />;
            },
          })}
        >
          <Drawer.Screen name="Início" component={HomeScreen} />
          <Drawer.Screen name="Listagem Completa" component={ListaCompletaScreen} />
          <Drawer.Screen name="Buscar" component={ResultScreen} />
          <Drawer.Screen name="Ajuda" component={AjudaScreen} />
          <Drawer.Screen name="Sobre" component={SobreScreen} />
 
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
    
  );
}

//Estilização do Stack, não lembro qual era o uso
const style = StyleSheet.create({
  nav:{
    justifyContent: 'center'
  },
})
