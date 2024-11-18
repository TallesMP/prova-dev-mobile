import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../ClienteSupabase'; // Importando o cliente Supabase
import { styles } from '../styles';

const Home = () => {
  const [user, setUser] = useState<any>(null); // Para armazenar o usuário logado
  const router = useRouter();

  useEffect(() => {
    // Função para verificar a sessão do usuário
    const checkUserSession = async () => {
      // Obtém a sessão atual do Supabase
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user; // Acesso ao usuário, que pode ser null

      if (!user) {
        // Se não houver um usuário, redireciona para a tela de login
        router.push('/login');
      } else {
        // Se o usuário estiver autenticado, armazena o usuário
        setUser(user);
      }
    };

    checkUserSession(); // Verifica a sessão no carregamento

    // Inscreve-se para mudanças de estado da sessão
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user) {
        // Redireciona para o login se o usuário não estiver autenticado
        router.push('/login');
      } else {
        setUser(user); // Atualiza o estado do usuário
      }
    });

    // Limpeza do listener quando o componente for desmontado
    return () => {
      authListener?.unsubscribe();
    };
  }, [router]); // Garantir que a dependência seja atualizada corretamente

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.title}>Você está logado como {user.email}</Text>
      ) : (
        <Text style={styles.title}>Redirecionando para o login...</Text>
      )}
    </View>
  );
};

export default Home;
