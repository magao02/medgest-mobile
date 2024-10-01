import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { ItemSeparatorView, ListItemP } from '~/components/ListItem';
import { getGestantesByMedico } from '~/services/gestanteServices';

export default function Home() {
  const [gestantes, setGestantes] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const { reload } = useLocalSearchParams();

  useEffect(() => {
    fetchGestantes();
  }, []);

  useEffect(() => {
    if (reload) {
      // Se o parâmetro "reload" for verdadeiro, recarrega os dados ou atualiza a UI
      fetchGestantes();
    }
  }, [reload]);

  const fetchGestantes = async () => {
    const gestantesData = await getGestantesByMedico('bf375643-80f2-467a-b0b6-510016d75a75');

    setRefreshing(false);

    setGestantes(gestantesData);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={gestantes}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }: any) => (
            <ListItemP nome={item.nome} id={item.id} nascimento={item.dataNascimento} />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchGestantes} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
