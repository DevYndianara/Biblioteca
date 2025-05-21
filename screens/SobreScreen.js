//Importar as libs
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Função da tela sobre com estilização e ícone
export default function SobreScreen() {
  //const [modalVisible, setModalVisible] = useState(true); Modal removido pq não ficou legal
  //const [fecharModal, setModalVisible] = useState(false);
    
  //const fecharModal = () => {
  //setModalVisible(false);
  //navigation.navigate('Ajuda');
//};

  return (
    <View style={styles.container}>
      
      <View style={styles.logo}>
        <Ionicons name="logo-react" size={80} color="#00bfff" options={{title: 'React Native'}} />
      </View>
     
        <View style={styles.sobre}>

          <Text style={styles.text}>
            Este aplicativo foi desenvolvido para catalogar um acervo de livros
            como trabalho da disciplina Programação para dispositivos móveis em Android, com a tutoria do professor André Przewodowoshi Filho.  {'\n\n'}
            
            Neste projeto foram utilizados os seguintes recursos: React Native v0.79, Expo SDK v53.0.0, Android Studio e o Firebase Realtime Database - logado
            com a minha conta do gmail, além disso, as requisições assíncronas foram utilizadas 
            do próprio Firebase, descartando o uso do Async-Storage da linguagem. Vale ressaltar que o Firebase é NoSql,
            ou seja, não há relacionamento entre os dados, já que há outras atualizações para armazenar na coleção do banco.{'\n\n'}

            O projeto inicial seria com autenticação de usuário, para criar um acervo com captura de imagem e armazenamento, 
            porém, ocorreram diversos problemas na sincronizaçãoe e uso do Auth, logo, foi necessário o descarte do projeto piloto, dessa forma,
            o desenvolvimento do aplicativo foi de algo simples e funcional. {'\n\n'}

            Desenvolvido por Yndianara Santos{'\n\n\n'}
            Versão: 1.0.0
          </Text>
         
        </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
},
  logo: { 
    width: 80,
    height: 80,
    backgroundColor: '#000',
    flexDirection:'row', //não está funcionando o comando da direção
    justifyContent: 'space-around',
    alignItems:'center',
    marginStart: 160, //gambiarra que funcionou o direcionamento no meio da tela, pelo menos no emulador e meu celular
    borderRadius: 10,
    marginTop:10,

  },
  sobre: { 
    flex: 1, 
    padding: 15, 
    alignItems: 'center',
},
  text: { 
    fontSize: 16, 
    lineHeight: 20,
    alignItems: 'center',
    //fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'justify'
}
});