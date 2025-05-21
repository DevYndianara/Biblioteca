//Tela de busca

//Importar estilização e banco de dados
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtrados, setFiltrados] = useState([]);
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'livros'));
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setLivros(lista);
        setFiltrados(lista);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    };

    carregarLivros();
  }, []);

  useEffect(() => {
    if (!busca.trim()) {
      setFiltrados(livros);
    } else {
      const termo = caseSensitive ? busca : busca.toLowerCase();
      const filtrados = livros.filter((livro) => {
        const titulo = caseSensitive ? livro.titulo : livro.titulo?.toLowerCase();
        const autor = caseSensitive ? livro.autor : livro.autor?.toLowerCase();
        return titulo?.includes(termo) || autor?.includes(termo);
      });
      setFiltrados(filtrados);
    }
  }, [busca, livros, caseSensitive]);

  const deletarLivro = async (id) => {
    try {
      await deleteDoc(doc(db, 'livros', id));
      const novaLista = livros.filter((livro) => livro.id !== id);
      setLivros(novaLista);
      setFiltrados(novaLista);
      Alert.alert('Sucesso', 'Livro deletado.');
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      Alert.alert('Erro', 'Não foi possível deletar.');
    }
  };

  //Função para habilitar o case sensitive
  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>minúscula/Maiúscula</Text>
        <Switch
          value={caseSensitive}
          onValueChange={setCaseSensitive}
          thumbColor={caseSensitive ? '#6666ff' : '#ccc'}
        />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar por título ou autor..."
          placeholderTextColor="#555"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>Autor: {item.autor}</Text>
            <Text>Editora: {item.editora}</Text>
            <Text>Ano: {item.ano}</Text>
            <Text>Unidades: {item.unidade}</Text>

            <TouchableOpacity
              style={styles.botaoDeletar}
              onPress={() => deletarLivro(item.id)}
            >
              <Text style={styles.textoBotao}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum livro encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    color: '#333',
    marginRight: 10,
    fontSize: 15,
    fontStyle: 'italic'

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  icon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    color: '#000'
  },
  lista: {
    paddingBottom: 30
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    elevation: 2
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  botaoDeletar: {
    marginTop: 10,
    backgroundColor: '#6666ff',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    color: '#666'
  }
});