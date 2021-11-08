import React, {useContext, useState } from "react";


const TokenContext = React.createContext();

export function useToken() {
    return useContext(TokenContext);
}

export function TokenProvider({ children }) {

    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={[token, setToken]}>
            {children}
        </TokenContext.Provider>
    );
}