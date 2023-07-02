import { ComponentProps, useState } from "react";
import classNames from "classnames";

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
    const [filterText, setFilterText] = useState<string>("");
    const [isStockOnly, setIsStockOnly] = useState<boolean>(false);

    function handleFilterTextChange(newText: string) {
        setFilterText(newText);
    }

    function handleStockOnlyToggle() {
        setIsStockOnly((previousValue) => !previousValue);
    }

    const filteredProducts = products.filter((product) => {
        const matchesSearchFilter = product.name
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase());

        const matchesStockOnlyFilter = isStockOnly
            ? product.stocked === true
            : true;

        return matchesSearchFilter && matchesStockOnlyFilter;
    });

    return (
        <>
            <SearchBar
                filterText={filterText}
                isStockOnly={isStockOnly}
                onFilterTextChange={handleFilterTextChange}
                onStockOnlyToggle={handleStockOnlyToggle}
            />
            <ProductTable products={filteredProducts} />
        </>
    );
}

interface SearchBarProps {
    filterText: string;
    isStockOnly: boolean;
    onFilterTextChange: (newText: string) => void;
    onStockOnlyToggle: () => void;
}

function SearchBar({
    filterText,
    isStockOnly,
    onFilterTextChange,
    onStockOnlyToggle,
}: SearchBarProps) {
    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}
            />

            <label>
                <p>Only show producs in stock</p>
                <input
                    type="checkbox"
                    checked={isStockOnly}
                    onChange={() => onStockOnlyToggle()}
                />
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
                isInStock={product.stocked}
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
    isInStock: boolean;
}

function ProductRow({ name, price, isInStock }: ProductRowProps) {
    return (
        <tr className={classNames({ "out-of-stock": !isInStock })}>
            <td>{name}</td>
            <td>{price}</td>
        </tr>
    );
}
