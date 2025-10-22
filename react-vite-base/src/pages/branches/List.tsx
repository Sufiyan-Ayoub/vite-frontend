import { TabSelect } from '@/comps';
import Table from '@/comps/globals/Table';
import { Head } from '@/pages/comps'
import { ProductStatus } from '@/types';
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
	{ id: 1, name: 'Product A', price: 10, stock: 50 },
	{ id: 2, name: 'Product B', price: 20, stock: 30 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 1, name: 'Product A', price: 10, stock: 50 },
	{ id: 2, name: 'Product B', price: 20, stock: 30 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 1, name: 'Product A', price: 10, stock: 50 },
	{ id: 2, name: 'Product B', price: 20, stock: 30 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 1, name: 'Product A', price: 10, stock: 50 },
	{ id: 2, name: 'Product B', price: 20, stock: 30 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 1, name: 'Product A', price: 10, stock: 50 },
	{ id: 2, name: 'Product B', price: 20, stock: 30 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 1, name: 'Product A', price: 10, stock: 50 },
	{ id: 2, name: 'Product B', price: 20, stock: 30 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
	{ id: 3, name: 'Product C', price: 15, stock: 100 },
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
			<div className='overflow-y-auto max-h-[calc(100vh - 50px)] px-4 space-y-4'>
				<div className=''>
					<TabSelect
						name={`status`}
						options={[
							{ label: `Active`, value: ProductStatus.Active },
							{ label: `In Active`, value: ProductStatus.InActive },
							{ label: `Out of Stock`, value: ProductStatus.OutOfStock },
							{ label: `Draft`, value: ProductStatus.Draft },
						]}
					/>
				</div>
				<Table
					cols={cols}
					list={dummyData}
					selectable={true}
					striped={true}
					pageSize={50}
					onSelect={handleSelectionChange}
				/>
			</div>

		</div>
	)
}

export default ProductList