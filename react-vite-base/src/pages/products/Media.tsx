import { Button } from '@/ui/button'
import { Dialog } from '@/comps'
import { CircleX, Eye, ListChecks, Trash2, Undo2, UploadIcon } from 'lucide-react'
import { FC, useEffect, useId, useRef, useState } from 'react'
import { getFileInfo, toast, Uploader } from '@/cores'
import { dynamic, FileInfo, FileStatus } from '@/types/utils'
import { getStore, useStore } from '@pex-craft/store'
import { AppStore, Store } from '@/store'
import { ButtonGroup } from '@/ui/button-group'
import { Checkbox } from '@/ui/checkbox'
import { DialogHandler } from '@/comps/globals/Dialog'

const ImageCover: FC<{ file: FileInfo, cancelUpload: (id: string) => void }> = ({ file, cancelUpload }) => {
    const { defaultMedia, vmedia, flag, dispatch } = useStore<typeof AppStore.Products>(Store.Products)
    
    const handleSelection = (checked: boolean) => {
        if (flag) {
            dispatch({
                vmedia: checked ? [...vmedia, file.url] : vmedia.filter(vm => vm !== file.url)
            });
        } else {
            dispatch({
                defaultMedia: checked ? [...defaultMedia, file.url] : defaultMedia.filter(dm => dm !== file.url)
            });
        }
    }
    
    return <div className={`--pm-media-${file.ID} relative h-[175px] rounded bg-[#eee] border border-border overflow-hidden group`}>
        <div className="absolute p-2 z-10 inset-0 flex justify-center items-center h-full w-full bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300">
            {file.url ? <>
                <Checkbox className='size-[18px]' defaultChecked={flag ? vmedia.includes(file.url) : defaultMedia.includes(file.url)} onCheckedChange={handleSelection} />
                <Button variant={`link`} className='group/btn'>
                    <Trash2 className='size-[20px] text-white group-hover/btn:text-red-600' />
                </Button>
            </> : <Button onClick={() => cancelUpload(file.ID)}><CircleX className='size-[20px] text-white' /></Button>}
        </div>
        <img src={!file.url ? file.uri : `/__/m?n=${file.url}`} className={`w-full h-full bg-[#ddd] object-contain ${file.url ? `blur-in-sm`: ``}`}  />
        {((file.progress != undefined && file.progress >= 0 && file.progress <= 100) || (file.status ?? 0) < 1) && 
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <div className='progress bg-[#eee] flex items-center justify-center rounded-2xl h-[18px] text-sm font-medium w-[50px]'>0%</div>
        </div>
        }
    </div>
}

const Media: FC = () => {
    const id = useId()
    const doc = useRef<HTMLDivElement>(null)
    const fileRef = useRef<HTMLInputElement>(null);
    const { isup, flag, media, dispatch } = useStore<typeof AppStore.Products>(Store.Products)
    const dialog = useRef<DialogHandler>(null)


    const selectAll = () => dispatch({ [flag ? `vmedia` : `defaultMedia`]: media.map(m => m.url) })
    const clearAll = () => dispatch({ [flag ? `vmedia` : `defaultMedia`]: [] })
    const delteAll = () => {}

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
                toast.error(`You can only select Image files!`);
            }
        }
        if (cache.length > 0) {
            event.target.value = ``;
            
            dispatch({
                isup: true,
                puc: cache.length,
                media: [...media, ...cache]
            })
            
            cache = [];
        }
    }

    const cancelUpload = (id: string) => {
        if ( !upl ) return toast.error(`Something wrong with uploader!`);
        upl.cancelRequest(id)
        dispatch({ media: media.filter(m => m.ID != id ) })
    }
    const onChange = (file: FileInfo) => {
        console.log(`[@change-event]:`,file);
        const node = doc.current?.querySelector(`.--pm-media-${file.ID}`);
        console.log(`i am your node:`,node)
        
        if(node instanceof HTMLElement){
            const img = node.querySelector(`img`);
            if(img) img.style.filter = `blur(${2 * (1 - ((file.progress ?? 0) / 100))}px)`;
            const progress = node.querySelector(`.progress`) as HTMLElement;
            console.log(`progress>>.`,progress)
            if(progress) progress.innerText = `${file.progress}%`;
        }
    }
    
    const onComplete = (f: FileInfo, resp: dynamic) => {
        const {puc: _puc, media:_media} = getStore<typeof AppStore.Products>(Store.Products)
        dispatch({
            isup: !((_puc - 1) <= 0),
            puc: _puc - 1,
            media: _media.map(m => m.ID == f.ID ? ({ ...f, progress: 100,ID: resp.dt, url: resp.i }) : m)
        })
    }

    const upl = useRef(
        new Uploader({
            onChange,
            onComplete,
            onCancel: f => {
                toast.error(`The upload for “${f.name}” has been cancelled.`)
                const {puc: _puc, media:_media} = getStore<typeof AppStore.Products>(Store.Products)
                dispatch({
                    isup: !((_puc - 1) <= 0),
                    puc: _puc - 1,
                    media: _media.filter(m => m.ID != f.ID)
                })
            },
            onError: (f: FileInfo) => {
                toast.error(`Upload failed for “${f.name}”. Please try again.`)
                const {puc: _puc, media:_media} = getStore<typeof AppStore.Products>(Store.Products)
                dispatch({
                    isup: !((_puc - 1) <= 0),
                    puc: _puc - 1,
                    media: _media.filter(m => m.ID != f.ID)
                })
            }
        })
    ).current;


    useEffect(() => {
        console.log(flag, dialog.current)
        if ( flag && dialog.current ) {
            dialog.current?.open()
        }
    }, [flag])

    return (
        <div className='flex flex-col gap-2 justify-center min-h-[170px] items-center bg-input border border-border border-dashed rounded'>
            <input id={`mng-media`} ref={fileRef} multiple type={`file`} accept='image/*' className='hidden' onChange={onfileSelect} />
            {(flag || media.length > 0) && <Dialog
                ref={dialog}
                onOpenChange={(state) => {
                    if ( flag ){
                        dispatch({ flag: false })
                    }
                }}
                as={`min-w-[70vw] min-h-[70vh]`}
                trigger={<div className='flex cursor-pointer text-muted-foreground hover:text-inherit transition-all items-center self-center gap-0.5 mb-4'>
                    <Eye size={20} />
                    View ({media.length})
                </div>}
                label={`Select File`}
                // actions={[
                //     // { label: `Cancel`, size: `sm`, variant: `secondary`, onClick: () => { } },
                //     { label: `Save Changes`, size: `sm`, onClick: () => dialog.current?.close() },
                // ]}
            >
                <div className='px-4 flex-1 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <ButtonGroup>
                            {
                                [
                                    { label: `Select All`, icon: ListChecks, click: selectAll},
                                    { label: `Clear Selected`, icon: Undo2, click: clearAll},
                                    { label: `Delete All`, icon: Trash2, click: delteAll},
                                ].map(
                                    (m, inx) => <Button key={`--${inx}-media-helpers-${id}`} variant={`secondary`} className='group/helpers transition-colors text-muted-foreground hover:text-inherit flex items-center gap-2' size={`sm`}>
                                        <m.icon className={`size-[20px] text-muted-foreground group-hover/helpers:text-inherit`} />
                                        {m.label}
                                    </Button>
                                )
                            }
                        </ButtonGroup>
                        <Button onClick={() => fileRef.current?.click()} variant={`secondary`} size={`sm`} className='text-muted-foreground transition-colors hover:text-inherit'>
                            {isup ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <UploadIcon />}
                            {isup ? `Uploading...` : `Upload new`}
                        </Button>
                    </div>
                    

                    <div ref={doc} className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {media.map((mu, i) => <ImageCover key={`--vmp-${i}`} file={mu} cancelUpload={cancelUpload}  />)}
                    </div>
                </div>
            </Dialog>}
            <Button onClick={() => fileRef.current?.click()} variant={`secondary`} size={`sm`}>
                {isup ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <UploadIcon />}
                {isup ? `Uploading...` : `Upload new`}
            </Button>
            <div className='text-center flex flex-col gap-2 mt-2'>
                <p className='text-xs text-[#aaa]'>Upload all your product images here.</p>
                {media.length == 0 && ( <p className="text-center text-xs text-[#aaa]">No images uploaded yet. Add some to visualize your product!</p> )}
            </div>
        </div>
    )
}
export default Media