import { getData, toast, uuid } from "@/cores"
import { AppStore, Store } from "@/store"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/ui/sheet"
import { useStore } from "@pex-craft/store"
import { Edit2, Plus, UploadIcon } from "lucide-react"
import { FC, useEffect, useRef, useState } from "react"

const EditVariant : FC<{ ID: string }> = ({ ID }) => {
    const form = useRef<HTMLDivElement>(null)
    const { variants,vmedia, flag, dispatch } = useStore<typeof AppStore.Products>(Store.Products)
    const variant = variants.find(v => v.ID == ID);

    const [price, setPrice] = useState<number>(variant?.price || 0);
    const [costPerItem, setCostPerItem] = useState<number>(variant?.costPerItem || 0);

    const profit = price - costPerItem;
    const margin = price > 0 ? ((profit / price) * 100).toFixed(2) : "0";


    const onSave = () => {
        if (!form.current) return toast.error("Something went wrong.");

        const { nm, stock, sku, barcode, minStock, maxStock, price, costPerItem } = getData(form.current);

        if (!nm) return toast.error("Name is required.");
        if (!stock) return toast.error("Quantity is required.");
        if (!price) return toast.error("Price is required.");
        if (!costPerItem) return toast.error("Cost per item is required.");

        if (stock && isNaN(Number(stock))) return toast.error("Quantity must be a valid number.");
        if (price && isNaN(Number(price))) return toast.error("Price must be a valid number.");
        if (costPerItem && isNaN(Number(costPerItem))) return toast.error("Cost per item must be a valid number.");

        if (!nm || !stock || !price || !costPerItem || isNaN(Number(stock)) || isNaN(Number(price)) || isNaN(Number(costPerItem))) {
            return;
        }

        dispatch({
            variants: variants.map(v => v.ID == ID ? 
                {
                    ID,
                    media: vmedia,
                    nm,
                    stock: Number(stock),
                    sku,
                    barcode,
                    minStock: minStock ? Number(minStock) : undefined,
                    maxStock: maxStock ? Number(maxStock) : undefined,
                    price: Number(price),
                costPerItem: Number(costPerItem),
            } : v),
            vmedia: []
        })
        // When a variant is updated
        toast.success("Variant updated successfully.");

    };

    useEffect(() => {
        dispatch({ vmedia: variant?.media })
    }, [])


    return <Sheet onOpenChange={isOpen => {
        if (!isOpen) {
            dispatch({ flag: false, vmedia: [] })
        }
    }}>
        <SheetTrigger asChild>
            <Button variant="secondary" size="sm" title="Edit Variant">
                <Edit2 size={16} />
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Edit Variant</SheetTitle>
            </SheetHeader>
            <div ref={form} className="grid flex-1 auto-rows-min gap-6 px-4">
                <Button onClick={() => dispatch({ flag: true })} variant={`secondary`} size={`sm`}>
                    <UploadIcon />
                    Select Variant Image
                </Button>
                <div className="grid gap-3">
                    <Label>Variant Name</Label>
                    <Input defaultValue={variant?.nm} name="nm" type={`text`} placeholder={`Variant name`} />
                </div>
                <div className='flex flex-col gap-4 p-4 border rounded'>
                    <Label>Inventory</Label>
                    <div className='flex flex-col gap-2'>
                        <Input defaultValue={variant?.stock} type='number' name={`stock`} placeholder={`Quantity`} />
                        <Input defaultValue={variant?.sku}  name={`sku`} placeholder={`SKU (optional)`} />
                        <Input defaultValue={variant?.barcode} name={`barcode`} placeholder={`Barcode (optional)`} />
                        <Input defaultValue={variant?.minStock} type='number' name={`minstock`} placeholder='Min Stock (optional)' />
                        <Input defaultValue={variant?.maxStock} type='number' name={`maxstock`} placeholder='Max Stock (optinoal)' />
                    </div>
                </div>
                {/* pricing */}
                {/* <div className='flex flex-col gap-4 p-4 border rounded'>
                    <Label>Pricing</Label>
                    <div className='flex flex-col gap-2'>
                        <Input type={`number`} name={`price`} placeholder={`Enter product price.`} />
                        <Input type={`number`} name={`costPerItem`} placeholder={`Enter product cost per item.`} />
                    </div>
                </div> */}
                <div className='flex flex-col gap-4 p-4 border rounded'>
                    <Label className='font-bold'>Pricing</Label>
                    <div className='flex flex-col gap-4'>
                        <div className="flex gap-2">
                           <div className="flex-1 flex flex-col gap-2">
                                <Label>Price</Label>
                                <Input type={`number`} name={`price`} value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder={`Price`} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <Label>CostPerItem</Label>
                                <Input type={`number`} name={`costPerItem`} value={costPerItem} onChange={(e) => setCostPerItem(Number(e.target.value))} placeholder={`CostPerItem`} />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 flex flex-col gap-2">
                                <Label>Profit</Label>
                                <Input type={`number`} value={profit} disabled placeholder={`--`} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <Label>Margin</Label>
                                <Input type={`number`} value={margin} disabled placeholder={`--`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SheetFooter>
                <Button onClick={onSave} className='self-start'>Save Changes</Button>
                {/* <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose> */}
            </SheetFooter>
        </SheetContent>
    </Sheet>
}
export default EditVariant