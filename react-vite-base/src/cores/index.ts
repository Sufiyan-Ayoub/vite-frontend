import { dynamic, FileInfo, FileStatus, ToastCallback, ToastType } from "@/types/utils";
import axios, { AxiosProgressEvent, Canceler, RawAxiosRequestHeaders } from "axios";
import { clsx, type ClassValue } from "clsx"
import { ElementType } from "react";
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie"
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
export const _removeAppLoader = () => {
	const loader = document.querySelector(`#--st-app-loader`)
	if ( loader ){
		(loader as HTMLDivElement).style.opacity = `0`;
		setTimeout(() => {
			loader.remove()
			const stys = document.querySelector(`#--i-app-styles`)
			if ( stys ) stys.remove()
		}, 200)
	}
}
export const getData = <T extends Record<string, string | boolean>>(current: HTMLDivElement) => {
	const data: Record<string, string | boolean> = {};
	current.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name]`)
		.forEach((el) => {
			if (el.type == `checkbox`) {
				data[el.name] = (el as HTMLInputElement).checked;
			} else if (el.type != `file`) {
				data[el.name] = el.value.trim();
			}
		})
	return data as T;
}
/**
 * @ToastService
 */
const subscribers: ToastCallback[] = [];

export const ToastService = {
	subscribe(callback: ToastCallback) {
		subscribers.push(callback);
	},
	unsubscribe(callback: ToastCallback) {
		const index = subscribers.indexOf(callback);
		if (index !== -1) subscribers.splice(index, 1);
	},
	showToast(message: string, type: ToastType = "info", duration?: number, icon?: ElementType) {
		subscribers.forEach((callback) => callback(message, type, duration || 3000, icon));
	}
}

export const toast = {
	error: (msg: string, icon?: ElementType, $?: number) => {
		ToastService.showToast(msg, "error", $, icon);
	},
	warn: (msg: string, icon?: ElementType, $?: number) => {
		ToastService.showToast(msg, "info", $, icon);
	},
	success: (msg: string, icon?: ElementType, $?: number) => {
		ToastService.showToast(msg, "success", $, icon);
	}
}
/* ***/

class withGlobals {

    _: any;

    constructor(value: any) {
        this._ = value
    }

    isTypeof(v: any) {
        return typeof this._ === typeof v
    }

    isFunction() {
        return typeof this._ === "function"
    }

    isArray() {
        return Array.isArray(this._)
    }

    isNull() {
        return this._ === null
    }

    isString() {
        return typeof this._ === "string"
    }

    isNumber() {
        return /^[+-]?\d+(\.\d+)?$/.test(this._ as any)
    }

    isObject() {
        return typeof this._ === "object" && !Array.isArray(this._) && this._ !== null
    }

    isEmpty() {
        if (Array.isArray(this._)) return this._.length === 0
        if (typeof this._ === "object" && this._ !== null) return Object.keys(this._).length === 0
        return this._?.trim() === "" || String(this._)?.trim().length === 0
    }

    isEmail() {
        return typeof this._ === "string" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this._)
    }

    isUrl() {
        return typeof this._ === "string" && /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(this._)
    }

    toLowerCase() {
        this._ = typeof this._ === "string" ? this._.toLowerCase() : String(this._).toLowerCase()
        return this
    }

    equals(v: any) { return this._ === v }

    ucfirst() {
        this._ = typeof this._ === "string" ? this._.charAt(0).toUpperCase() + this._.slice(1) : this._
        return this
    }

    formatString(v: string | number, ...vv: (string | number)[]) {
        if (typeof this._ !== "string") this._ = "";
        const values = [v, ...vv];
        this._ = this._.replace(/%(\d+)/g, (inp: any, index: any) => values[Number(index)]?.toString() || `%${index}`)
        return this
    }

    enumTokeys() {
        this._ = Object.keys(this._).filter(k => isNaN(+k))
        return this
    }

    eKeyOf<T extends Record<string, string | number>>(o: T): T[keyof T] {
        if (this._ == null) throw new Error("Input is null or undefined");

        const input = String(this._).toLowerCase();

        for (const [key, val] of Object.entries(o)) {
            if (String(val).toLowerCase() === input || String(key).toLowerCase() === input) {
                return val as T[keyof T];
            }
        }

        throw new Error(`Enum value not found for input "${this._}"`);
    }


    camelCase() {
        this._ = typeof this._ === "string"
            ? this._
                .split(/[^a-zA-Z0-9]+/)
                .map((word, index) =>
                    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join("")
            : this._
        return this
    }

    value() { return this._ }

    valueOf() { return this._ }

    toString() { return String(this._) }

    [Symbol.toPrimitive](hint: string) {
        if (hint === "number") return Number(this._);
        if (hint === "boolean") return Boolean(this._);
        return String(this._);
    }

}

export const _ = <T>(value: T) => new withGlobals(value);
export const withPost = async <T>(
    uri: string, data: dynamic, 
    timeout: number = 60, ignoreKind: boolean = false, 
    headers?: dynamic, onProgress?:(ev: AxiosProgressEvent) => void, 
    getCanceller?: (canceler: Canceler) => void,
    cancelable: boolean = false
) : Promise<T> => {
    const source = cancelable ? axios.CancelToken.source() : undefined;

	if (cancelable && source?.cancel) {
		getCanceller?.(source.cancel);
	}
    
    if (data instanceof FormData) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: uri,
                data: data,
                timeout: timeout * 1000,
                cancelToken: source ? source.token : undefined,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(headers || {})
                },
                onUploadProgress: ev => onProgress && onProgress(ev)
            })
                .then(resp => {
                if (resp.data && (ignoreKind || ("kind" in resp.data))) {
                    resolve(resp.data as T);
                }
                else {
                    reject(resp.data);
                }
            })
                .catch(err => reject(err));
        });
    }
    else if (_(data).isString()) {
        return new Promise((resolve, reject) => {
            axios.post(uri, data, {
                timeout: 1000 * timeout,
                cancelToken: source ? source.token : undefined,
                headers: {
                    'Content-Type': 'application/json',
                    ...(headers || {})
                }
            })
                .then(resp => {
                    console.log(`axios response`,resp)
                    if (resp.data && (ignoreKind || ("kind" in resp.data))) {
                        resolve(resp.data as T);
                    }
                    else {
                        reject(resp.data);
                    }
            })
                .catch(err => {
                if (err?.response?.data)
                    reject(err.response.data);
                else
                    reject(err);
            });
        });
    }
    else if (typeof data === "object" && !Array.isArray(data) && data !== null) {
        return new Promise((resolve, reject) => {
            axios.post(uri, {
                ...data,
                __stmp: Date.now()
            }, {
                cancelToken: source ? source.token : undefined,
                timeout: 1000 * timeout,
                headers: {
                    'Content-Type': 'application/json',
                    ...(headers || {})
                }
            })
                .then(resp => {
                    if (resp.data && (ignoreKind || ("kind" in resp.data))) {
                        resolve(resp.data as T);
                    }
                    else {
                        reject(resp.data);
                    }
                })
                .catch(err => {
                    if (err?.response?.data)
                        reject(err.response.data);
                    else
                        reject(err);
                });
        });
    }
    return new Promise((resolve, reject) => {
        reject();
    });
}

export const withGet = async <T>(uri: string, timeout:number = 60, ignoreKind: boolean = false, headers?: RawAxiosRequestHeaders) : Promise<T> => {
    return new Promise((resolve, reject) => {
        axios
            .get(uri, { timeout: timeout * 1000, ...(headers && { headers }) })
            .then((resp) => {
            if (resp.data && (ignoreKind || "kind" in resp.data)) {
                resolve(resp.data as T);
            }
            else {
                reject(resp.data);
            }
        })
            .catch((err) => {
            if (err?.response?.data)
                reject(err.response.data);
            else
                reject(err);
        });
    });
}
export const uuid = (len?: number) => {
  let uuid = ``;
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < (len || 4); i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
}

export const getFileInfo = (f: File, ID?: string): FileInfo => ({
  ID: ID || uuid(6),
  name: f.name,
  type: f.type,
  size: f.size,
  progress: 0,
  uri: URL.createObjectURL(f),
  url: null,
  status: FileStatus.InQue,
});


export const setCookie = (key: string, value: string, expiry?: number) => Cookies.set(key, value, { expires: expiry || 7 });
export const getCookie = (key: string) => key == `` ? Cookies.get() : Cookies.get(key) || null;
export const removeCookie = (key: string) => Cookies.remove(key);

export {default as Uploader} from './uploader'