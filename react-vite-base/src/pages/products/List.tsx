import { Table } from '@/comps/globals/Table';
import { Head } from '@/pages/comps'
import { useState } from 'react';
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const dummyData: Product[] = [
  { id: 1, name: 'Product A', price: 10, stock: 50 },
  { id: 2, name: 'Product B', price: 20, stock: 30 },
  { id: 3, name: 'Product C', price: 15, stock: 100 },
];
const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: (row: Product) => `$${row.price.toFixed(2)}` },
    { header: 'Stock', accessor: 'stock' },
  ];


  const handleSelectionChange = (rows: Product[]) => {
    console.log('Selected rows:', rows);
    setSelectedProducts(rows);
  };

  return (
    <div className='flex-1 flex flex-col space-y-4'>
      <Head
        label={`Products`}

      />
      <Table
        columns={columns}
        data={dummyData}
        selectable
        onSelectionChange={handleSelectionChange}
        rowClassName={(row: any, idx: any) => (idx % 2 === 0 ? 'bg-gray-50' : '')}
      />

    </div>
  )
}

export default ProductList