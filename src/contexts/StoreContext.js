import React, { useContext, useState } from "react";

const StoreContext = React.createContext();
const ActiveStoreContext = React.createContext();

export function useStore() {
    return useContext(StoreContext);
}

export function useActiveStore() {
    return useContext(ActiveStoreContext)
}


export function StoreProvider({children}) {

    const [store, setStore] = useState();
    const [activeStore, setActiveStore] = useState();

    return (
        <StoreContext.Provider value={[store, setStore]}>
            <ActiveStoreContext.Provider value={[activeStore, setActiveStore]}>
            {children}
            </ActiveStoreContext.Provider>
        </StoreContext.Provider>
    )
}