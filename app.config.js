import dotenv from 'dotenv';

// Carregar o arquivo correto com base no APP_ENV
dotenv.config({
  path: `.env.${process.env.APP_ENV || 'local'}`,
});

export default ({ config }) => {
  const environment = process.env.APP_ENV || 'local';
  const apiUrl = process.env.API_URL;
  console.log(`Running in ${environment} mode`);
  console.log(`API URL: ${apiUrl}`);

  return {
    ...config,
    name: "MyApp",
    slug: "my-app",
    version: "1.0.0",
    extra: {
      apiUrl, 
      environment,
    },
  };
};
