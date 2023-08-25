const env_config = {
	port: process.env.PORT || 3001 as number,
	db_url: process.env.MONGO_DB_URL as string,
	db_name: process.env.DB_NAME as string,
	frontend_url: process.env.FRONTEND_URL as string
} as const;

export function getEnv<T extends keyof typeof env_config>(config: T): typeof env_config[T] {
	return env_config[config];
}