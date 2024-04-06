

export default function getEnv(envName:string): string|undefined{

    return window?._env_?.[envName] ?? import.meta.env[envName] ?? undefined;

}