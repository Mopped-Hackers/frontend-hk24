import {useContext,createContext, useState, ReactNode,FunctionComponent} from "react"

interface AuthUserType {
    id: number;
    email: string;
    username: string;
}

interface AuthContextType {
    user: AuthUserType | null;
    isLoggedIn: boolean;
    login(username: string, password: string): boolean;
}


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUserType|null>(null);

    const login = (username: string, password: string): boolean => {
        // TODO: Implementation of the login function
        console.log(`Login attempt with username: ${username} and password: ${password}`);
        setUser(null);
        return false;
    };

    const isLoggedIn: boolean = user !== null;
    const value: AuthContextType = { isLoggedIn, user, login };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

