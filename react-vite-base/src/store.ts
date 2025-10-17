export enum Store {
    Main = `main`,
    User = `user`,
    Products = `products`
}


export const AppStore = {
    // App,
    // User, //Authenticaation
    Products: {
        loading: false,
        list: [],
        variants: [],
    }

    // Users: {
    //     loading: false,
    //     error: null as string | null,
    //     errorMsg: null as string | null,
    //     offset: 0,
    //     list: [] as UserType[],
    //     stats: { 
    //         totalCount: 0, 
    //         activeCount: 0, 
    //         inactiveCount: 0, 
    //         bannedCount: 0 
    //     },
    //     edit: null as UserType | null,
    // }
}