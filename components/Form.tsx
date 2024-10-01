import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, Form, H3, Input, Label, Spinner, XStack } from 'tamagui';

import { createGestante } from '~/services/gestanteServices';

export function FormsDemo() {
  const [status, setStatus] = React.useState<'off' | 'submitting' | 'submitted'>('off');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());

  React.useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);
  // eslint-disable-next-line node/handle-callback-err
  const onchange = (e: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onSubmit = async () => {
    setStatus('submitting');
    const data = new Date(date);

    // Extrair o ano, mês e dia
    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são baseados em zero
    const dia = String(data.getUTCDate()).padStart(2, '0');

    // Formatar a data no formato desejado
    const dataFormatada = `${ano}-${mes}-${dia}`;
    const dados = {
      nome,
      email,
      dataNascimento: dataFormatada,
      medico: 'bf375643-80f2-467a-b0b6-510016d75a75',
    };
    console.log('Dados:', dados);

    const response = await createGestante(dados);
    console.log('Response:', response);
    if (response.error) {
      console.error('Erro:', response.error);
      return;
    }

    // Limpar os campos
    setNome('');
    setEmail('');
    setDate(new Date());
    // Atualizar o status
    setStatus('submitted');

    router.push({
      pathname: '/',
      params: { reload: 'true' }, // Passa o parâmetro de recarregar
    });

    // Enviar dados para a API
  };

  return (
    <Form alignItems="center" minWidth={300} gap="$3" onSubmit={() => onSubmit()} padding="$6">
      <H3 color="#222" marginTop="$2" marginBottom="$4">
        Cadastrar nova gestante
      </H3>
      <Label marginBottom="$2" fontSize={18} color="#222" fontWeight="500" alignSelf="flex-start">
        Nome:
      </Label>

      <XStack alignItems="center" space="$4">
        <Input
          flex={1}
          marginBottom={3}
          borderWidth={1}
          paddingHorizontal="$3"
          borderRadius="$2"
          borderColor="#ccc"
          size="$5"
          color="#222"
          backgroundColor="#FFF"
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
      </XStack>
      <Label marginBottom="$2" fontSize={18} color="#222" fontWeight="500" alignSelf="flex-start">
        Email:
      </Label>
      <XStack alignItems="center" space="$4">
        <Input
          flex={1}
          value={email}
          marginBottom={3}
          borderWidth={1}
          paddingHorizontal="$3"
          borderRadius="$2"
          borderColor="#ccc"
          size="$5"
          color="#222"
          backgroundColor="#FFF"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
      </XStack>
      <Label marginBottom="$1" fontSize={18} color="#222" fontWeight="500" alignSelf="flex-start">
        Data de nascimento:
      </Label>
      <DateTimePicker
        testID="dateTimePicker"
        mode="date"
        value={date}
        display="spinner"
        onChange={onchange}
      />
      <Form.Trigger asChild disabled={status !== 'off'}>
        <Button
          backgroundColor={status === 'submitting' ? '$gray5' : '#EC4899'}
          icon={status === 'submitting' ? () => <Spinner /> : undefined}>
          Cadastrar gestante
        </Button>
      </Form.Trigger>
    </Form>
  );
}
