export type CoverProps = { msg?: string, fullMode?: boolean };
export type CoverHandler = {
    setLoading: (state: boolean) => void;
    open: () => void;
    close: () => void;
}