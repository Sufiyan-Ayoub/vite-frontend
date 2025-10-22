import { dynamic, FileInfo } from "@/types/utils";

export enum Store {
    Main = `main`,
    User = `user`,
    Products = `products`
}


type ProductStore = {
    loading: boolean;
    list: Array<dynamic>;
    variants: Array<{
        ID: string;
        nm: string;
        media: string;
        stock: string;
        sku?: string;
        barcode?: string;
        minStock?: string;
        maxStock?: string;
        price: number;
        costPerItem: number;
    }>;
    puc: number;
    isup: boolean;
    media: FileInfo[];
    defaultMedia: string[];
    flag: boolean;
    vmedia: string[];
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
        media: [],
        defaultMedia: [],
        flag: false,
        vmedia: []
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