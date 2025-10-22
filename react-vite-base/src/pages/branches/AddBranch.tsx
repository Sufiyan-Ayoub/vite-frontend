import { Head } from "../comps"

const AddBranch = () => {
    return (
         <div className='flex-1 flex flex-col space-y-4'>
            <Head
                label={`Add Product`}
                actions={[
                    { label: `Save Product`, onClick: () => {} }
                ]}
            />

            <div className="">

            </div>
        </div>
    )
}

export default AddBranch