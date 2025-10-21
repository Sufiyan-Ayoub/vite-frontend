import { getData, toast } from "@/cores"
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
import { Plus, UploadIcon } from "lucide-react"
import { useRef } from "react"

const AddVariant = () => {
    const form = useRef<HTMLDivElement>(null)
    const { variants, flag, dispatch } = useStore<typeof AppStore.Products>(Store.Products)

    const onSave = () => {
        if ( !form.current ) return toast.error(`Something went wrong.`)
        console.log(getData(form.current))
    }

    return <Sheet onOpenChange={isOpen => {
        if (!isOpen) {
            dispatch({ flag: false, vmedia: [] })
        }
    }}>
        <SheetTrigger asChild>
            <Button variant="secondary">
                <Plus size={16} /> Add Variant
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Add Variant</SheetTitle>
            </SheetHeader>
            <div ref={form} className="grid flex-1 auto-rows-min gap-6 px-4">
                <Button onClick={() => dispatch({ flag: true })} variant={`secondary`} size={`sm`}>
                    <UploadIcon />
                    Select Variant Image
                </Button>
                <div className="grid gap-3">
                    <Label>Variant Name</Label>
                    <Input name="nm" type={`text`} placeholder={`Variant name`} />
                </div>
                <div className='flex flex-col gap-4 p-4 border rounded'>
                    <Label>Inventory</Label>
                    <div className='flex flex-col gap-2'>
                        <Input type='number' name={`quantity`} placeholder={`Quantity`} />
                        <Input name={`sku`} placeholder={`SKU (optional)`} />
                        <Input name={`barcode`} placeholder={`Barcode (optional)`} />
                        <Input type='number' name={`minstock`} placeholder='Min Stock (optional)' />
                        <Input type='number' name={`maxstock`} placeholder='Max Stock (optinoal)' />
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
export default AddVariant