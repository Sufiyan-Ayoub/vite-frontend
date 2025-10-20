import { dynamic, FileInfo } from "@/types/utils";

export enum Store {
    Main = `main`,
    User = `user`,
    Products = `products`
}


type ProductStore = {
    loading: boolean;
    list: Array<dynamic>;
    variants: Array<dynamic>;
    puc: number;
    isup: boolean;
    media: FileInfo[]
}


export const AppStore = {
    // App,
    // User, //Authenticaation
    Products: {
        loading: false,
        list: [],
        variants: [],
        puc: 0, /// pending uploads
        isup: false,
        media: []
    } as ProductStore

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