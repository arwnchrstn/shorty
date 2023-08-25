const env_config = {
    server_url: import.meta.env.VITE_SERVER_URL,
    server_uri: import.meta.env.VITE_SERVER_BASE_URI
} as const

export const getEnv = <T extends keyof typeof env_config>(code: T) => env_config[code]