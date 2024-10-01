import DateTimePicker from '@react-native-community/datetimepicker';
import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import { useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { Button, Form, H2, H3, Input, Label, Spinner, XStack } from 'tamagui';
import { /*...*/ CartesianChart, Line, useChartPressState } from 'victory-native';

import { CadastrarGlicemia } from '~/services/gestanteServices';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedText = Animated.createAnimatedComponent(TextInput);
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default function Glicemias() {
  const { state, isActive } = useChartPressState<{ x: never; y: Record<never, number> }>({
    x: 0 as never,
    y: { valor: 0 } as Record<never, number>,
  });
  const [valor, setValor] = useState('');
  const [date, setDate] = useState(new Date());
  const [mediaGlicemias, setMediaGlicemias] = useState(0);

  const [status, setStatus] = React.useState<'off' | 'submitting' | 'submitted'>('off');
  const { glicemias, gestante } = useGlobalSearchParams();
  const parsedGlicemias = JSON.parse(glicemias);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [glicemias]);

  const fetchData = async () => {
    const DATA = await parsedGlicemias.map((glicemia) => ({
      day: new Date(glicemia.data),
      valor: glicemia.valor,
    }));
    setChartData(DATA);
    const media = DATA.reduce((acc, curr) => acc + curr.valor, 0) / DATA.length;
    console.log('media', media);
    setMediaGlicemias(media);
  };

  const font = useFont(require('../../../assets/Roboto-Regular.ttf'));

  const count = chartData.length > 8 ? 8 : chartData.length;
  const animatedText = useAnimatedProps(() => {
    return {
      text: `última glicemia: ${state.y.valor.value.value}`,
      defaultValue: 'Sem glicemias registradas',
    };
  });

  const onSubmit = async () => {
    console.log(gestante);
    setStatus('submitting');
    const dados = {
      valor,
      data: format(date, 'yyyy-MM-dd'),
      gestante_id: gestante,
    };
    const response = await CadastrarGlicemia(dados);
    if (response.id) {
      setStatus('submitted');
      setValor('');
      setDate(new Date());
      const newData = { day: new Date(dados.data), valor: dados.valor };
      setChartData((prevData) => [...prevData, newData]);
    }
  };
  const onchange = (e: any, selectedDate: any) => {
    console.log(e);
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal={false}
          showsVerticalScrollIndicator={false}>
          <Form
            alignItems="center"
            minWidth={200}
            gap="$3"
            onSubmit={() => onSubmit()}
            padding="$6">
            <H3 color="#222" marginTop="$2" marginBottom="$4">
              Cadastrar nova glicemia
            </H3>

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
                placeholder="Valor"
                value={valor}
                onChangeText={(text) => setValor(text)}
              />
            </XStack>

            <Label
              marginBottom="$1"
              fontSize={18}
              color="#222"
              fontWeight="500"
              alignSelf="flex-start">
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
          <View style={{ height: 400, width: '98%' }}>
            {isActive && (
              <View>
                <AnimatedText
                  editable={false}
                  style={{ fontSize: 30, fontWeight: 'bold', color: '#222' }}
                  animatedProps={animatedText}
                />
              </View>
            )}
            {!isActive && (
              <View>
                <H2 paddingBottom="$3" color="#222">
                  {count > 0
                    ? 'Média de glicemias ' + mediaGlicemias.toFixed(2)
                    : 'Sem glicemias registradas'}
                </H2>
              </View>
            )}
            {count > 0 ? (
              <CartesianChart
                data={chartData}
                chartPressState={state}
                xKey="day"
                yKeys={['valor']}
                axisOptions={{
                  tickCount: count,
                  font,
                  labelOffset: { x: 4, y: 3 },
                  labelPosition: 'inset',

                  formatYLabel: (value) => `${value}`,
                  formatXLabel: (value) => format(value, 'dd/MM'),
                }}>
                {({ points }) => (
                  <>
                    <Line points={points.valor} color="#EC4899" strokeWidth={4} />
                    {isActive && <ToolTip x={state.x.position} y={state.y.valor.position} />}
                  </>
                )}
              </CartesianChart>
            ) : (
              <H2 color="#222">Não há dados para exibir</H2>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    width: '100%',
    height: '100%',

    // Centralizar vertical e horizontalmente
    justifyContent: 'center',
    alignItems: 'center',
  },
});
