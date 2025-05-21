import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useTheme } from '@react-navigation/native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

export default function ListaCompletaScreen() {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'livros'));
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setLivros(lista);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      } finally {
        setLoading(false);
      }
    };
    carregarLivros();
  }, []);

  const livrosFiltrados = livros.filter((livro) => {
    const termo = filtro.toLowerCase();
    return (
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo)
    );
  });

  const exportarParaPDF = async () => {
    const html = `
      <html>
        <body>
          <h1>Listagem de Livros</h1>
          <ul>
            ${livrosFiltrados.map(livro => `
              <li>
                <strong>${livro.titulo}</strong><br/>
                Autor: ${livro.autor}<br/>
                Editora: ${livro.editora}<br/>
                Ano: ${livro.ano}<br/>
                Unidades: ${livro.unidade}<br/><br/>
              </li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} size="large" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Buscar por título ou autor"
        placeholderTextColor={colors.text}
        value={filtro}
        onChangeText={setFiltro}
        style={[styles.input, {
          borderColor: colors.border,
          color: colors.text,
        }]}
      />

      <TouchableOpacity style={styles.botao} onPress={exportarParaPDF}>
        <Text style={styles.botaoTexto}><Ionicons name="share-social-outline" size={20} color="#fff" />  Exportar para PDF</Text>
      </TouchableOpacity>

      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.titulo, { color: colors.text }]}>{item.titulo}</Text>
            <Text style={{ color: colors.text }}>Autor: {item.autor}</Text>
            <Text style={{ color: colors.text }}>Editora: {item.editora}</Text>
            <Text style={{ color: colors.text }}>Ano: {item.ano}</Text>
            <Text style={{ color: colors.text }}>Unidades: {item.unidade}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.text }]}>Nenhum livro encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#0077cc',
    padding: 10,
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    textAlign:'center'
  },
  botaoTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  lista: {
    paddingBottom: 20,
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  },
});