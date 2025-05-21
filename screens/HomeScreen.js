//Está é a página principal de interface do usuário

//Importar as bibliotecas e o firebaseConfig
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//Constantes que estabelece as infos dos livros a serem adicionados 
export default function HomeScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [unidade, setUnid] = useState('');
  const [ano, setAno] = useState('');
  const [editora, setEditora] = useState('');
  const scheme = useColorScheme();

 //Constante de adicionar os campos do livro de forma assíncrona e acionar o db com alertas para o usuário
  const adicionarLivro = async () => {
    if (!titulo || !autor) return Alert.alert('Erro', 'Preencha título e autor.');
    try {
      await addDoc(collection(db, 'livros'), { titulo, autor, unidade, ano, editora });
      Alert.alert('Sucesso', 'O livro foi adicionado!');
      setTitulo('');
      setAutor('');
      setUnid('');
      setAno('');
      setEditora('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar o livro, tente novamente.');
    }
  };

 //Constante para buscar os livros por título do livro e/ou autor 
  const buscarLivros = async () => {
    try {
      const livrosRef = collection(db, 'livros');
      const snapshot = await getDocs(livrosRef);
      const livros = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (livro) =>
            (titulo && livro.titulo === titulo) || (autor && livro.autor === autor)
        );

        //Retorna a busca também em resultados, com alerta
      navigation.navigate('Resultados', { livros });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na busca.');
    }
  };

  const styles = getStyles(scheme);

  //Campo para inserir os dados do livro com limite de caracteres, 
  // configuração de número no Input, além da configuração dos ícones e botões
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <MaterialCommunityIcons name="bookshelf" size={70} color='#990099' />
        <Text style={styles.title1} >Cadastre os dados do livro</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Título do Livro"
        value={titulo}
        onChangeText={setTitulo}
        maxLength={150}
        placeholderTextColor={scheme === 'dark' ? '#ccc' : '#555'}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Autor"
        value={autor}
        onChangeText={setAutor}
        maxLength={40}
        placeholderTextColor={scheme === 'dark' ? '#ccc' : '#555'}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano da edição"
        value={ano}
        keyboardType="numeric"
        onChangeText={setAno}
        maxLength={4}
        placeholderTextColor={scheme === 'dark' ? '#ccc' : '#555'}
      />
      <TextInput
        style={styles.input}
        placeholder="Editora"
        value={editora}
        onChangeText={setEditora}
        maxLength={15}
        placeholderTextColor={scheme === 'dark' ? '#ccc' : '#555'}
      />
      <TextInput
        style={styles.input}
        placeholder="Unidades"
        value={unidade}
        keyboardType="numeric"
        onChangeText={setUnid}
        maxLength={2}
        placeholderTextColor={scheme === 'dark' ? '#ccc' : '#555'}
      />

      <View style={styles.botoes}>
        <TouchableOpacity style={[ styles.botao, { backgroundColor: '#990099' }]} onPress={adicionarLivro}>
        <Ionicons name="book-outline" size={25} color="#fff" /><Text style={styles.botaoText}>Adicionar Livro</Text>
          

       </TouchableOpacity>

        {/*<TouchableOpacity style={[styles.botao, { backgroundColor: '#009900' }]} onPress={buscarLivros}>
          <Ionicons name="search" size={20} color="#fff" />
          <Text style={styles.botaoText}>Buscar Livro</Text>
        </TouchableOpacity> botão removido da homeScreen por ter dado crash no teste ainda no ambiente de desenvolvimento, dia 20 de maio, às 22h30*/}
      </View>
    </ScrollView>
  );
}

const getStyles = (scheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: scheme === 'dark' ? '#000' : '#fff',
    },
    title1:{
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      padding: 30,
    },
    title2: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 25,
      fontWeight: 'bold',
      color: scheme === 'dark' ? '#fff' : '#000',
    },
    logo: { 
    alignItems: 'center', 
    padding: 5, 
    marginBottom: 10,
  },
    input: {
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      borderColor: scheme === 'dark' ? '#555' : '#ccc',
      color: scheme === 'dark' ? '#fff' : '#000',
    },
    botoes: {
      //flexDirection: 'row',
      //justifyContent: 'center',
      marginBottom: 40,
      //padding: 8,
      //justifyContent: 'space-evenly' comentados pelo segundo botão não funcionar com a página de ResultScreen
      
      //padding: 10,
      borderRadius: 5,
      //height: 70,
      //width: 300,
      //padding: 20,
      //marginTop: 20,
      //textAlign: 'center',
      //paddingEnd: 10,
      
    },
    botao: {
      //flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      //height: 70,
      //width: 300,
      padding: 20,
      marginTop: 20,
      textAlign: 'center',
      paddingEnd: 10,
    },
    botaoText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });