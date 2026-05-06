export const config = {
  api_url: import.meta.env.VITE_APP_ENV === 'local' ? '/api' : `${import.meta.env.VITE_API_URL}/api`
};