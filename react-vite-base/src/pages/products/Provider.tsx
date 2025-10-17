import { AppStore, Store } from '@/store'
import createStore from '@pex-craft/store'
import React, { FC } from 'react'

const ProductProvider : FC<{ children: React.ReactNode }> = ({ children }) => {
    const { Provider } = createStore(Store.Products, AppStore.Products)

    return (
        <Provider>{children}</Provider>
    )
}

export default ProductProvider