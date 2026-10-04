const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dayone-sxkq.onrender.com';
const WS_BASE_URL = API_BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://');

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      createRun: () => `${API_BASE_URL}/api/analyze`,
      getDossier: (sessionId: string) => `${API_BASE_URL}/api/result/${sessionId}`,
      getRunStream: (sessionId: string) => `${WS_BASE_URL}/ws/${sessionId}`,
    },
  },
} as const;