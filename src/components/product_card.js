import { useEffect, useRef, useState } from "react";
import Input from "./input";
import RadioItem from "./radio_item";

let data = {
    productName: "",
    brand: "",
    price: "",
    quantity: "",
    unit: "",
};
function toInt(data = "") {
    data = data.toString();
    const regex = /[0-9]/g;
    data = parseFloat((data.match(regex) || []).join(""));
    return isNaN(data) ? "" : data;
}
function ProductCard({ setData = {}, getData, id }) {
    const _productName = setData.productName;
    const _brand = setData.brand;
    const _price = setData.price;
    const _quantity = setData.quantity;
    const _unit = setData.unit ? setData.unit : 'مترمربع';
    console.log(setData);

    const isInitialMount = useRef(true);
    const [productName, setProductName] = useState(_productName);
    const [brand, setBrand] = useState(_brand);
    const [price, setPrice] = useState(toInt(_price));
    const [quantity, setQuantity] = useState(toInt(_quantity));
    const [unit, setUnit] = useState(_unit);

    function productNameChangeHandler(e) {
        setProductName(e.target.value);
        data.productName = e.target.value;
    }
    function brandChangeHandler(e) {
        setBrand(e.target.value);
        data.brand = e.target.value;
    }
    function priceChangeHandler(e) {
        e.preventDefault();
        let { value = "" } = e.target;
        value = toInt(value);
        setPrice(value.toLocaleString("en-US"));
        data.price = value;
        console.log(value);
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
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const _price = toInt(price);
            const _quantity = toInt(quantity);
            console.log(_price);
            // Your useEffect code here to be run on update
            getData({ id, productName, brand, price: _price, quantity: _quantity, unit });
            console.log("RUN");
        }
        return () => {};
    });

    return (
        <div
            className={
                "bg-gray-100 transition-all duration-400 p-5 rounded-lg w-full border" +
                (price && quantity && " border-primary")
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
            <div className={!productName && !price && !quantity && "hidden"}>
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
                        placeholder={"1,500,000"}
                        type={"tel"}
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
                            <option selected={unit === "مترمربع"}>
                                مترمربع
                            </option>
                            <option selected={unit === "عدد"}>عدد</option>
                            <option selected={unit === "متر طول"}>
                                متر طول
                            </option>
                            <option selected={unit === "شاخه"}>شاخه</option>
                        </select>
                    </div>
                </div>
            </div>
            {price && quantity && (
                <div className="flex justify-between bg-primary text-white text-xs mt-5 -mx-5 -mb-5 py-2 px-5 rounded-br-md rounded-bl-md font-bold">
                    <span>مجموع</span>
                    <span>
                        {(
                            parseFloat(data.price) * parseFloat(quantity)
                        ).toLocaleString("fa-IR") + " تومان"}
                    </span>
                </div>
            )}
        </div>
    );
}
export default ProductCard;
