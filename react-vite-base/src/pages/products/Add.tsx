import Editor from '@/comps/globals/Editor'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Head } from '@/pages/comps'
import { Select, TabSelect } from '@/comps'
import { Label } from '@/ui/label'
import { useRef } from 'react'
import { getData, toast } from '@/cores'
import AddVariant from './AddVariant'
// import { useStore } from '@pex-craft/store'
// import { Store } from '@/store'
import Media from './Media'
import { ProductStatus } from '@/types'
import { UOMOptions } from '@/config'

const AddProduct = () => {
    const form = useRef<HTMLDivElement>(null);
    // const { media, dispatch } = useStore(Store.Products)

    const onSubmit = () => {
        if (!form.current) return toast.error(`Something went wrong.`);
        const data = getData(form.current)
        // console.log(media)
        console.log(data);
    }

   
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
                            { label: `Draft`, value: ProductStatus.Draft },
                            { label: `In Active`, value: ProductStatus.InActive },
                            { label: `Active`, value: ProductStatus.Active },
                            { label: `Out of Stock`, value: ProductStatus.OutOfStock },
                        ]}
                    />
                    <div className='flex flex-col gap-2'>
                        <Label>Description (Optional) </Label>
                        <Editor name={`desc`} />
                    </div>
                    {/* media */}

                    <Media />

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
                                <Select options={UOMOptions} />
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
                        <div className='flex gap-4'>
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