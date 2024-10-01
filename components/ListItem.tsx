import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { View } from 'react-native';

import { ListItem } from './CustomListItem';
interface ListItemsProps {
  id: string;
  nome: string;
  nascimento: string;
}
export function ListItemP({ id, nome, nascimento }: ListItemsProps) {
  const idade = new Date().getFullYear() - new Date(nascimento).getFullYear();
  const themeColor = '#EC4899';
  const handlePress = (id: string) => {
    console.log('id', id);
    router.push({
      pathname: '/gestante',
      params: { id, reload: 'true' }, // Passa o parâmetro de recarregar
    }); // Navegar para a rota dinâmica
  };
  return (
    <ListItem
      hoverTheme
      pressTheme
      onPress={() => handlePress(id)}
      key={id}
      title={nome}
      subTitle={`Idade: ${idade}`}
      icon={<FontAwesome name="user" size={30} color={themeColor} />}
      iconAfter={<Entypo name="chevron-right" size={24} color={themeColor} />}
      color="red"
      style={{ marginBottom: 20, backgroundColor: '#fff' }}
    />
  );
}

export const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: 5,
        width: '100%',
      }}
    />
  );
};
