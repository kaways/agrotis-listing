import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/'
});

export const fetchLaboratorios = async () => {
  const response = await api.get('laboratorios.json');
  return response.data;
};

export const fetchPropriedades = async () => {
  const response = await api.get('propriedades.json');
  return response.data;
};