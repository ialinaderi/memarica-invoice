import { useEffect, useState } from "react";
import Input from "./input";
import RadioItem from "./radio_item";

let data = {
    productName: "",
    brand: "",
    price: "",
    quantity: "",
    unit: "",
};
function ProductCard({ getData, id }) {
    const [productName, setProductName] = useState("");
    data.productName = productName;
    const [brand, setBrand] = useState("");
    data.brand = brand;
    const [price, setPrice] = useState("");
    data.price = price;
    const [quantity, setQuantity] = useState("");
    data.quantity = quantity;
    const [unit, setUnit] = useState("مترمربع");
    data.unit = unit;

    function productNameChangeHandler(e) {
        setProductName(e.target.value);
        data.productName = e.target.value;
    }
    function brandChangeHandler(e) {
        setBrand(e.target.value);
        data.brand = e.target.value;
    }
    function priceChangeHandler(e) {
        setPrice(e.target.value);
        data.price = e.target.value;
    }
    function quantityChangeHandler(e) {
        setQuantity(e.target.value);
        data.quantity = e.target.value;
    }
    function unitChangeHandler(e) {
        setUnit(e.target.value);
        data.unit = e.target.value;
    }
    useEffect(() => {
        return () => {
            getData({ ...data, id });
        };
    });

    return (
        <div
            className={
                "bg-gray-100 transition-all duration-400 p-5 rounded-lg w-full border" +
                (productName && price && quantity && " border-blue-600")
            }
        >
            <Input
                value={productName}
                onChange={productNameChangeHandler}
                label={"نام محصول"}
                id={"product_name" + id}
                placeholder={"ترمووود"}
                type={"text"}
                inputClassName={"bg-white"}
            />
            <div className={!productName && "h-0 overflow-hidden"}>
                <div className="flex gap-3 mt-4">
                    <Input
                        value={brand}
                        onChange={brandChangeHandler}
                        label={"برند"}
                        id={"brand" + id}
                        placeholder={"فنلاندی"}
                        type={"text"}
                        inputClassName={"bg-white"}
                    />
                    <Input
                        value={price}
                        onChange={priceChangeHandler}
                        label={"قیمت"}
                        id={"price" + id}
                        ltr={true}
                        placeholder={"1500000"}
                        type={"number"}
                        inputClassName={"bg-white"}
                    />
                </div>
                <div className="flex gap-3 mt-4">
                    <Input
                        value={quantity}
                        onChange={quantityChangeHandler}
                        className={"flex-1"}
                        label={"مقدار " + `(${unit})`}
                        id={"quantity" + id}
                        ltr={true}
                        placeholder={"34"}
                        type={"number"}
                        inputClassName={"bg-white"}
                    />
                    <div className="flex-1 flex flex-col flex-wrap justify-between">
                        {/* <RadioItem
                            onChange={unitChangeHandler}
                            checked={true}
                            id={"m2" + id}
                            label={"مترمربع"}
                            name={"unit" + id}
                        />
                        <RadioItem
                            onChange={unitChangeHandler}
                            id={"shakhe" + id}
                            label={"شاخه"}
                            name={"unit" + id}
                        />
                        <RadioItem
                            onChange={unitChangeHandler}
                            id={"mtool" + id}
                            label={"متر طول"}
                            name={"unit" + id}
                        />
                        <RadioItem
                            onChange={unitChangeHandler}
                            id={"num" + id}
                            label={"عدد"}
                            name={"unit" + id}
                        /> */}
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor={id}
                        >
                            واحد
                        </label>
                        <select
                            onChange={unitChangeHandler}
                            className="block w-full text-gray-700 bg-white placeholder:text-gray-300 border border-gray-300 focus:border-gray-500 rounded py-[0.57rem] px-4 leading-tight focus:outline-none focus:bg-white"
                        >
                            <option>مترمربع</option>
                            <option>عدد</option>
                            <option>متر طول</option>
                            <option>شاخه</option>
                        </select>
                    </div>
                </div>
            </div>
            {price && quantity && (
                <div className="flex justify-between bg-blue-600 text-white text-xs mt-5 -mx-5 -mb-5 py-2 px-5 rounded-br-md rounded-bl-md font-bold">
                    <span>مجموع</span>
                    <span>
                        {(
                            parseInt(price) * parseFloat(quantity)
                        ).toLocaleString("fa-IR") + " تومان"}
                    </span>
                </div>
            )}
        </div>
    );
}
export default ProductCard;
