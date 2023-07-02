import { ComponentProps } from "react";

interface Product {
    readonly category: string;
    readonly price: string;
    readonly stocked: boolean;
    readonly name: string;
}

const PRODUCTS: Product[] = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function App() {
    return <FilterableProductTable products={PRODUCTS} />;
}

export default App;

interface FilterableProductTableprops {
    products: Product[];
}

function FilterableProductTable({ products }: FilterableProductTableprops) {
    return (
        <>
            <SearchBar />
            <ProductTable products={products} />
        </>
    );
}

function SearchBar() {
    return (
        <>
            <input type="text" placeholder="Search..." />
            <label>
                <p>Only show producs in stock</p>
                <input type="checkbox" />
            </label>
        </>
    );
}

type ProductTableProps = ComponentProps<typeof FilterableProductTable>;

function ProductTable({ products }: ProductTableProps) {
    let category: string;
    const rows: JSX.Element[] = [];

    products.forEach((product) => {
        if (product.category !== category) {
            rows.push(
                <ProductCategoryRow
                    key={product.category}
                    category={product.category}
                />
            );

            category = product.category;
        }

        rows.push(
            <ProductRow
                key={product.name}
                name={product.name}
                price={product.price}
            />
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <td>name</td>
                    <td>price</td>
                </tr>
            </thead>

            <tbody>{rows}</tbody>
        </table>
    );
}

interface ProductCategoryRow {
    category: string;
}

function ProductCategoryRow({ category }: ProductCategoryRow) {
    return (
        <tr>
            <td className="category">{category}</td>
        </tr>
    );
}

interface ProductRowProps {
    name: string;
    price: string;
}

function ProductRow({ name, price }: ProductRowProps) {
    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
        </tr>
    );
}
