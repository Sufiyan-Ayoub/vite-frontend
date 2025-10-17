import { Input } from '@/ui/input';
import { lazy, Suspense, FC, useEffect, useState, MouseEvent } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import Cover from './cover';
import { useMounted } from '@/cores/hooks';

const ReactQuill = lazy(() => import('react-quill-new'));

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ size: ["small","large", "huge"] }],
        ["link"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "align",
    "size",
    "link",
    "image",
];

const Editor: FC<{ name: string; placeholder?: string; defaultValue?: string }> = ({ name, placeholder, defaultValue }) => {
    const [value, setValue] = useState<string>(defaultValue ?? '');
    const mounted = useMounted();

    useEffect(() => {
        setValue(defaultValue ?? '');
    }, [defaultValue]);

    if (!mounted) return <Cover fullMode={false} />;

    return (
        <div onClick={(e: MouseEvent<HTMLDivElement>) => { e.stopPropagation(); e.preventDefault(); }}>
            <Suspense fallback={<Cover fullMode={false} />}>
                <ReactQuill
                    style={{ minHeight: `150px` }}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={value}
                    onChange={setValue}
                    placeholder={placeholder ?? ``}
                />
            </Suspense>
            <Input type="hidden" name={name} value={value} />
        </div>
    );
};

Editor.displayName = "Editor";

export default Editor;