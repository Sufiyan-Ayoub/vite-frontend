import { Button } from '@/ui/button'
import { Dialog } from '@/comps'
import { Eye, UploadIcon } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import { getFileInfo, toast, Uploader } from '@/cores'
import { dynamic, FileInfo } from '@/types/utils'
import { useStore } from '@pex-craft/store'
import { Store } from '@/store'

const Media: FC = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const { isup, puc, media, dispatch } = useStore(Store.Products)
    const onfileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (!files) return;
        let cache: FileInfo[] = [];

        for (const file of files) {
            if (file.type?.startsWith(`image/`)) {
                const f = getFileInfo(file);
                upl.setApi(`/__/m/upload`);
                upl.append({ size: f.size, file: file });
                upl.addToQue({ ...f });
                cache.push(f);
            } else {
                // console.log(`You can only select Image files!`);
                toast.error(`You can only select Image files!`);
            }
        }
        if (cache.length > 0) {
            event.target.value = ``;
            // dispatch(setMedia(cache));
            dispatch({
                isup: true,
                puc: cache.length,
            })
            console.log(cache)
            cache = [];
        }
    }

    const onChange = (file: FileInfo) => {
        // console.log(`[@change-event]:`,file);
        // const node = doc.current?.querySelectorAll(`.meta-poster-${file.ID}`);       
        // if(node && node?.length > 0 ) {
        //     node.forEach(el => {
        //         if(el instanceof HTMLElement){
        //             const img = el.querySelector(`img`);
        //             if(img) {
        //                 img.style.filter = `blur(${2 * (1 - (file.progress / 100))}px)`;
        //             }
        //             const progress = el.querySelector(`.progress`) as HTMLElement;
        //             if(progress) progress.innerText = `${file.progress}%`;
        //         }
        //     });
        // }
    }

    const onComplete = (f: FileInfo, resp: dynamic) => {
        console.log(`uploaded`, media)
        dispatch({
            isup: !((puc - 1) <= 0),
            puc: puc - 1,
            media: [...media, resp.i]
        })
    }

    const upl = useRef(
        new Uploader({
            onChange: () => { },
            onComplete,
            onCancel: () => { },
            onError: (f: FileInfo) => {
                dispatch({
                    isup: !(puc <= 0),
                    puc: puc - 1,
                })
            }
        })).current;


    return (
        <div className='flex flex-col gap-2 justify-center min-h-[170px] items-center bg-input border border-border border-dashed rounded'>
            <input ref={fileRef} multiple type={`file`} accept='image/*' className='hidden' onChange={onfileSelect} />
            {media.length > 0 && <Dialog
                trigger={<div className='flex items-center self-center gap-0.5 mb-4'>
                    <Eye size={20} />
                    View ({media.length})
                </div>}
                label={`Select File`}
                actions={[
                    // { label: `Cancel`, size: `sm`, variant: `secondary`, onClick: () => { } },
                    { label: `Save Changes`, size: `sm`, onClick: () => { } },
                ]}
            >
                <div className=''>

                </div>
            </Dialog>}
            <Button onClick={() => fileRef.current?.click()} variant={`secondary`} size={`sm`}>
                {isup ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <UploadIcon />}
                {isup ? `Uploading...` : `Upload new`}
            </Button>
            <div className='text-center flex flex-col gap-2 mt-2'>
                <p className='text-xs text-[#aaa]'>Upload all your product images here.</p>
                {media.length == 0 && (
                    <p className="text-center text-xs text-[#aaa]">No images uploaded yet. Add some to visualize your product!</p>
                )}

            </div>
        </div>
    )
}
export default Media