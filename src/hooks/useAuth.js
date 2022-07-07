import * as React from 'react';

const authContext = React.createContext();

export function useAuth() {
    const [authed, setAuthed] = React.useState(false);

    return (
        {
            authed,

            login() {
                return new Promise((res) => {
                    setAuthed(true);
                    res();
                });
            },

            logout() {
                return new Promise((res) => {
                    setAuthed(false);
                    res();
                });
            },
        }
    );
}

export const AuthProvider = ({children}) => {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const AuthConsumer = () => {
    return React.useContext(authContext);
}

export default AuthConsumer;