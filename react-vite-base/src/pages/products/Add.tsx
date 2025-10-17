import Editor from '@/comps/globals/Editor'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Head } from '@/pages/comps'
import { Select, TabSelect } from '@/comps'
import { Label } from '@/ui/label'
import { Eye, UploadIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { getData, getFileInfo, toast, Uploader } from '@/cores'
import { dynamic, FileInfo } from '@/types/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import AddVariant from './AddVariant'

const AddProduct = () => {
    const form = useRef<HTMLDivElement>(null);
    const file = useRef<HTMLInputElement>(null);
    const [media, setMedia] = useState<String[]>([]);
    const [isUploading, setIsUploading] = useState(false); 
    const [pendingUploads, setPendingUploads] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onfileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if(!files) return;
        let cache: FileInfo[] = [];
    
        for(const file of files){
            if(file.type?.startsWith(`image/`)){
                const f = getFileInfo(file);
                upl.setApi(`/__/m/upload`);
                upl.append({ size: f.size, file: file });
                upl.addToQue({ ...f });
                cache.push(f);
            }else{
                // console.log(`You can only select Image files!`);
                toast.error(`You can only select Image files!`);
            }
        }   
        if(cache.length > 0){    
            event.target.value = ``;
            // dispatch(setMedia(cache));
            setPendingUploads(cache.length); // Set pending count
            setIsUploading(true);
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

    const onComplete = (f: FileInfo, resp: dynamic ) => {
        // console.log(`[@complete-event]`, f, resp);
        console.log(resp)
        setMedia(prev => ([ ...prev, resp.i]))
        setPendingUploads(prev => {
            const newCount = prev - 1;
            if (newCount <= 0) {
                setIsUploading(false);
            }
            return newCount;
        });
    }

    const onSubmit = () => {
        if (!form.current) return toast.error(`Something went wrong.`);
        const data = getData(form.current)
        console.log(media)
        console.log(data);
    }

    const upl = useRef(
        new Uploader({ 
            onChange,
            onComplete, 
            onCancel: ()=>{}, 
            onError: (f: FileInfo) => console.log(f)
    })).current;

    return (
        <div className='flex-1 flex flex-col space-y-4'>
            <Head
                label={`Add Product`}
                actions={[
                    { label: `Save Product`, onClick: onSubmit }
                ]}
            />
            <div className='p-4 flex gap-4 m-auto overflow-y-auto'>
                <div ref={form} className="flex-1 flex flex-col gap-6 max-w-[600px]">

                    {/* basic info */}
                    <div className='flex flex-col gap-2'>
                        <Label>Title</Label>
                        <Input name={`nm`} placeholder={`Product Title`} />
                    </div>
                    <Label>Status</Label>
                    <TabSelect
                        name={`status`}
                        options={[
                            { label: `Draft`, value: `draft` },
                            { label: `In Active`, value: `inactive` },
                            { label: `Active`, value: `active` },
                            { label: `Out of Stock`, value: `outofstock` },
                        ]}
                    />
                    <div className='flex flex-col gap-2'>
                        <Label>Description (Optional) </Label>
                        <Editor name={`desc`} />
                    </div>
                    {/* media */}
                    <div className='flex flex-col gap-2 justify-center min-h-[170px] items-center bg-input border border-border border-dashed rounded'>
                        <input ref={file} multiple type={`file`} accept='image/*' className='hidden' onChange={onfileSelect} />
                        <Button onClick={() => file.current?.click()} variant={`secondary`} size={`sm`}>
                            {isUploading ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />:<UploadIcon />}
                            {isUploading ? `Uploading...` : `Upload new`}
                        </Button>
                        <div className='text-center flex flex-col gap-2 mt-2'>
                            <p className='text-xs text-[#aaa]'>Upload all your product images here.</p>
                            {media.length === 0 && (
                                <p className="text-center text-xs text-[#aaa]">No images uploaded yet. Add some to visualize your product!</p>
                            )}
                        </div>

                        {/* <Button 
                            onClick={() => file.current?.click()} 
                            variant={`secondary`} 
                            size={`lg`}
                            disabled={isUploading}
                            className="flex items-center gap-2 px-6 py-3"
                        >
                            <UploadIcon className="h-5 w-5" />
                            {isUploading ? (
                                <span className="flex items-center gap-2">
                                    Uploading...
                                </span>
                            ) : (
                                "Upload Images"
                            )}
                        </Button>
                        <p className='text-xs text-muted-foreground'>Upload up to 10 product images (JPG, PNG, max 5MB each).</p>
                         */}
                        {/* Thumbnails Preview */}
                        {media.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4 w-full justify-center">
                                {/* {media.slice(0, 4).map((url, index) => ( // Show up to 4 small thumbs
                                    <div key={index} className="relative group w-16 h-16 rounded-lg overflow-hidden bg-muted shadow-sm">
                                        <img 
                                            src={url.toString()} 
                                            alt={`Uploaded ${index + 1}`} 
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                        />
                                        <button
                                            onClick={() => {}}
                                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))} */}
                                {/* More Button with Dialog */}
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                            <Eye />
                                            View Uploaded
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
                                        <DialogHeader className="flex-shrink-0">
                                            <DialogTitle className="text-xl">Product Images Gallery ({media.length})</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex-1 overflow-y-auto p-4">
                                            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                                                {media.map((url, index) => (
                                                    <div key={index} className="relative group w-full aspect-square rounded-lg overflow-hidden bg-muted shadow-sm">
                                                        <img 
                                                            src={url.toString()} 
                                                            alt={`Uploaded ${index + 1}`} 
                                                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform" 
                                                        />
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // handleDelete(index);
                                                            }}
                                                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>

                    {/* inventory */}
                    <div className='flex flex-col gap-4 p-4 border rounded'>
                        <Label className='font-bold'>Inventory</Label>
                        <div className='flex gap-4'>
                            <div className='flex-1 flex flex-col gap-2'>
                                <Label>SKU (Optional) </Label>
                                <Input name={`sku`} placeholder={`SKU`} />
                            </div>

                            <div className='flex-1 flex flex-col gap-2'>
                                <Label>Barcode (Optional) </Label>
                                <Input name={`barcode`} placeholder={`Barcode`} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label>UOM (Unit of Measurement)</Label>
                                <Select options={[
                                    {label:`pc`, value: `pc`}
                                ]} />
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex-1 flex flex-col gap-2'>
                                <Label>Min Stock (Optional) </Label>
                                <Input type='number' name={`minstock`} placeholder='Min Stock (optional)' />
                            </div>
                            <div className='flex-1 flex flex-col gap-2'>
                                <Label>Max Stock (Optional) </Label>
                                <Input type='number' name={`maxstock`} placeholder='Max Stock (optinoal)' />
                            </div>
                            <div className='flex-1 flex flex-col gap-2'>
                                <Label>Quantity</Label>
                                <Input type='number' name={`quantity`} placeholder={`Quantity`} />
                            </div>
                        </div>
                    </div>
                    {/* pricing */}
                    <div className='flex flex-col gap-4 p-4 border rounded'>
                        <Label className='font-bold'>Pricing</Label>
                        <div className='flex flex-col gap-4'>
                            <div className="flex gap-2">
                                <div className="flex-1 flex flex-col gap-2">
                                    <Label>Price</Label>
                                    <Input type={`number`} name={`price`} placeholder={`Price`} />
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <Label>CostPerItem</Label>
                                    <Input type={`number`} name={`costPerItem`} placeholder={`CostPerItem`} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1 flex flex-col gap-2">
                                    <Label>Profit</Label>
                                    <Input type={`number`} disabled name={`profit`} placeholder={`--`} />
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <Label>Margin</Label>
                                    <Input type={`number`} disabled name={`margin`} placeholder={`--`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* variant */}
                    <div className='flex flex-col gap-4 p-4 border rounded'>
                        <Label className='font-bold'>Variants</Label>
                        <div>
                            <AddVariant />
                        </div>

                    </div>
                    <Button onClick={onSubmit} className='self-start' size={`sm`}>Save Product</Button>
                    <div className='min-h-10'></div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct