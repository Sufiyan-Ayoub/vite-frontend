import { AppStore, Store } from '@/store'
import createStore from '@pex-craft/store'
import React, { FC } from 'react'

const BranchProvider : FC<{ children: React.ReactNode }> = ({ children }) => {
    const { Provider } = createStore(Store.Branches, AppStore.Branches)

    return (
        <Provider>{children}</Provider>
    )
}

export default BranchProvider