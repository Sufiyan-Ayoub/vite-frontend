import { Table } from '@/comps'
import { Head } from '@/pages/comps'

const ProductList = () => {
  return (
      <div className='flex-1 flex flex-col space-y-4'>
        <Head
            label={`Products`}
            
        />
        <Table />
      </div>
  )
}

export default ProductList