export type CoverProps = { msg?: string };
export type CoverHandler = {
    setLoading: (state: boolean) => void;
    open: () => void;
    close: () => void;
}