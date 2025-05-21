//Tela de instrunções de uso

//Importações de ícones 
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function AjudaScreen() {
 //const [modalVisible, setModalVisible] = useState(true); - Modal não ficou legal, alterado apenas para view

//Container com as infos sobre a funcionalidade do aplicativo e ícones
  return (
    <View style={styles.container}>

      <View style={styles.logo}>
        <Ionicons name="help-circle" size={80} color="#990099" />
      </View>

        <View style={styles.help}>

            <Text style={styles.text}><MaterialCommunityIcons name="bookshelf" size={30} color='#990099' /> Insira os dados nos campos e cadastre um novo livro;{'\n'}</Text>
            <Text style={styles.text}><Ionicons name="search" size={30} color="#990099" />  Clique em "Buscar Livro" e pesquise por nome de autor ou título da obra;{'\n'}</Text>
            <Text style={styles.text}><Ionicons name="book" size={30} color="#990099" />  Clique em "Listagem Completa" para ver todos os livros, buscar por título ou autor;{'\n'}</Text> 
            <Text style={styles.text}><Ionicons name="share-social-sharp" size={30} color="#990099" />  Você pode exportar a lista em formato PDF, clique em "Exportar PDF" para salvar e compartilhar a lista;{'\n'}</Text>
            <Text style={styles.text}><FontAwesome6 name="hand-holding" size={30} color="#990099" /> Ah, caso não tenha conexão com a Internet ao inserir os dados, saiba que o aplicativo possui a funcionalidade de cache local e upar os dados para o servidor quando reestabelecer a conexão.</Text>
        </View>

    </View>
  );
}

//Estilização do conteiner principal e dos ícones
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
  logo: { 
    marginTop: 10,
    alignItems: 'center', 
    marginEnd: 150,
    marginStart: 145,
    borderRadius: 10,
  },
  help: { 
    justifyContent: 'start', 
    padding: 15,
    

  },
  text: { 
    fontSize: 18, 
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    lineHeight: 30,
    textAlign: 'justify'
  }
});