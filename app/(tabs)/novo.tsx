import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { FormsDemo } from '~/components/Form';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen />
      <View style={styles.container}>
        <FormsDemo />
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
