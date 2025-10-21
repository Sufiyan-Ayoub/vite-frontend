import Table from '@/comps/globals/Table';
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
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
];
const ProductList = () => {
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	const cols = [
		{ label: 'ID', value: 'id' },
		{ label: 'name', value: 'name' },
		{ label: 'stock', value: 'stock' },
	];


	const handleSelectionChange = (rows: Product[]) => {
		console.log('Selected rows:', rows);
		setSelectedProducts(rows);
	}

	return (
		<div className='flex-1 flex flex-col space-y-4'>
			<Head
				label={`Products`}
				links={[
					{ label: `Add Product`, uri: `/dashboard/products/create` }
				]}
			/>
			<div className='p-4'>
				<Table
					cols={cols}
					list={dummyData}
					selectable={true}
					striped={true}
					onSelect={handleSelectionChange}
				/>
			</div>

		</div>
	)
}

export default ProductList