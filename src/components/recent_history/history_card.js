import { faAngleDown, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { Link } from "react-router-dom";
import Input from "../input";
import ProductData from "./product_data";

const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

let data;
export default function HistoryCard({
    invoiceNumber,
    date,
    name,
    products,
    gender,
}) {
    if (gender === "آقا") {
        gender = "آقای";
    } else if (gender === "خانم") {
        gender = "خانم";
    } else {
        gender = "";
    }

    const [open, setOpen] = useState(false);
    let totalPrice = 0;
    products.forEach((element) => {
        totalPrice += parseFloat(element.price) * parseFloat(element.quantity);
    });

    return (
        <div
            className={
                "bg-gray-100 transition-all duration-400 p-5 rounded-lg w-full border border-primary"
            }
        >
            <div className="flex justify-between text-sm items-center mb-5 text-gray-500">
                <p>
                    تاریخ: <span dir="ltr">{e2p(date)}</span>
                </p>
                <p>
                    شماره: <span dir="ltr">{e2p(invoiceNumber)}</span>
                </p>
                <a
                    href={
                        "/?" +
                        encodeURIComponent(
                            JSON.stringify({
                                invoiceNumber,
                                date,
                                name,
                                gender,
                                products,
                            })
                        )
                    }
                >
                    <FontAwesomeIcon
                        className="text-gray-500 text-xl place-self-end"
                        icon={faEdit}
                    />
                </a>
            </div>
            <Input
                disabled={true}
                value={`${gender} ${name}`}
                label={"نام و نام خانوادگی مشتری"}
                id={"name"}
                inputClassName={"bg-white"}
            />
            <AnimateHeight height={open ? "auto" : 0}>
                <p className="block tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5">
                    اطلاعات محصولات
                </p>
                <div className="flex flex-col gap-5">
                    {() => products.reverse()}
                    {products.map(
                        ({ productName, brand, quantity, unit, price }) => (
                            <ProductData
                                key={name}
                                name={productName}
                                brand={brand}
                                quantity={quantity}
                                unit={unit}
                                price={price}
                            />
                        )
                    )}
                </div>
            </AnimateHeight>
            <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center bg-primary text-white text-xs mt-5 -mx-5 -mb-5 py-2 px-5 rounded-br-md rounded-bl-md font-bold"
            >
                <span className="flex-1">مجموع</span>
                <FontAwesomeIcon
                    className={
                        "text-xl flex flex-1 transition-transform duration-300" +
                        (open ? " rotate-180" : " rotate-0")
                    }
                    icon={faAngleDown}
                />
                <span className="flex-1 text-left">
                    {parseFloat(totalPrice).toLocaleString("fa-IR") + " تومان"}
                </span>
            </div>
        </div>
    );
}
