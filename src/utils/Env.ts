

export default function getEnv(envName:string): string|undefined{

    if (import.meta.env.PROD && import.meta.env.VITE_DOCKER){
        return window?._env_?.[envName] ?? import.meta.env[envName] ?? undefined;
    }

    return import.meta.env[envName] ?? undefined;
}