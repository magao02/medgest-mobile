import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFont } from '@shopify/react-native-skia';
import { Link, router, Stack, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, H3, XStack } from 'tamagui';

import { getGestanteById } from '~/services/gestanteServices';
interface Gestante {
  nome: string;
  glicemias?: any;
}
export default function Home() {
  const { id, reload } = useGlobalSearchParams();
  const [gestante, setGestante] = useState<Gestante>({ nome: '' });

  useEffect(() => {
    console.log('reload', reload);
    if (reload) {
      fetchGestante(id);
    }
  }, [reload]);

  const fetchGestante = async (id: any) => {
    const gestanteData = await getGestanteById(id);
    console.log('gestanteData', gestanteData);
    setGestante(gestanteData);
  };

  const getToGlicemias = () => {
    console.log('gestante', gestante.glicemias);
    router.push({
      pathname: '/gestante/glicemias',
      params: { glicemias: JSON.stringify(gestante.glicemias), gestante: id }, // Passa o parâmetro de recarregar
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Gestante' }} />
      <View style={styles.container}>
        <H3 color="#222" marginTop="$2" marginBottom="$4">
          {gestante.nome}
        </H3>

        <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
          <DemoCard
            onPress={() => getToGlicemias()}
            animation="bouncy"
            size="$4"
            width={350}
            height={150}
            scale={0.9}
            marginBottom="$4"
            backgroundColor="#fafafa"
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            borderColor="#ccc"
            textPadding="$6"
            name="Glicemias"
            icon={<Fontisto name="blood-test" size={54} color="#EC4899" />}
          />
          <DemoCard
            onPress={() => getToGlicemias()}
            animation="bouncy"
            size="$4"
            width={350}
            height={150}
            scale={0.9}
            marginBottom="$4"
            backgroundColor="#fafafa"
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            borderColor="#ccc"
            name="pesos"
            textPadding="$7"
            icon={<FontAwesome5 name="balance-scale" size={54} color="#EC4899" />}
          />
          <DemoCard
            animation="bouncy"
            size="$4"
            width={350}
            height={150}
            scale={0.9}
            backgroundColor="#fafafa"
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            borderColor="#ccc"
            name="exames"
            textPadding="$6"
            icon={<MaterialIcons name="monitor-heart" size={54} color="#EC4899" />}
          />
        </XStack>
      </View>
    </>
  );
}

export function DemoCard(props: any) {
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header
        flexDirection="row"
        marginTop="$5"
        justifyContent="center"
        alignItems="center"
        padded>
        {props.icon}
        <H2 paddingLeft={props.textPadding} color="#EC4899">
          {props.name}
        </H2>
      </Card.Header>

      <Card.Background />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

    alignItems: 'center',
  },
});
