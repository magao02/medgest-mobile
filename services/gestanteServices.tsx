import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const getGestantesByMedico = async (medicoId: string) => {
  const response = await fetch(`${apiUrl}/users/medico/${medicoId}`);

  return await response.json();
};

const createGestante = async (data: any) => {
  const dataa = {
    nome: data.nome,
    email: data.email,
    dataNascimento: data.dataNascimento,
    medico: data.medico,
    role: 'gestante',
    password: data.email,
  };
  const response = await fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataa),
  });

  return await response.json();
};

const getGestanteById = async (id: string) => {
  const response = await fetch(`${apiUrl}/users/${id}`);

  return await response.json();
};

const CadastrarGlicemia = async (data: any) => {
  const response = await fetch(`${apiUrl}/glicemias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export { getGestantesByMedico, createGestante, getGestanteById, CadastrarGlicemia };
