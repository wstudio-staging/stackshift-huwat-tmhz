export const namespace = "webriq-cstudio";
export const pluginConfigKeys = [
  {
    key: "apiSecretToken",
    title: "API Secret Token",
  },
];
export const getAuthHeaders = (config) => {
  const { apiSecretToken } = config;

  return {
    "x-api-secret-token": apiSecretToken,
  };
};
