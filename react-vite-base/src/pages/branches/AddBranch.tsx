import React, { useRef } from 'react'
import { Head } from '../comps'
import { Button } from '@/ui/button';
import { I, Select } from '@/comps';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';

const AddBranch = () => {
    const form = useRef<HTMLDivElement>(null);

    const onSubmit = () => { }

    return (
        <div className='flex-1 flex flex-col space-y-4'>
            <Head
                label={`Add Branch`}
                actions={[
                    { label: `Save Branch`, onClick: onSubmit }
                ]}
            />
            <div className='p-4 flex gap-4 overflow-y-aut min-w-[500px] mx-auto'>
                <div ref={form} className="flex-1 flex flex-col gap-6 max-w-[600px]">

                    <I>
                        <Label>Branch Name</Label>
                        <Input name={`nm`} placeholder={`Branch Name`} />
                    </I>
                    <I>
                        <Label>Brand Name</Label>
                        <Select placeholder='Select Brand Name' />
                    </I>
                    <I>
                        <Label>City</Label>
                        <Input name={`city`} placeholder='City (optional)' />
                    </I>
                    <I>
                        <Label>Location</Label>
                        <Input name={`location`} placeholder='Location (optional)' />
                    </I>
                    
                    <Button onClick={onSubmit} className='self-start' size={`sm`}>Save Product</Button>
                    <div className='min-h-10'></div>
                </div>
            </div>
        </div>
    )
}

export default AddBranch