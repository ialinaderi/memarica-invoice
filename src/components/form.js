import Input from "./input";
import ProductCard from "./product_card";
import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../document";
import AnimateHeight from "react-animate-height";

let lastId = 0;
function generateId() {
    lastId++;
    return `${lastId}`;
}
let productsData = [];
let queryJson = {};

const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const Form = () => {
    let today = new Date().toLocaleDateString("fa-IR-u-nu-latn");
    let invoiceNum =
        today.split("/")[0].slice(2) + "-" + today.split("/")[1] + "-" + 40;

    const [loading, setLoading] = useState(false);
    const [editingNum, setEditingNum] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [generatePdf, setGeneratePdf] = useState(false);
    const [invoiceNumber, setInvoiceNumber] = useState(invoiceNum);
    const [date, setDate] = useState(today);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("آقا");
    const [numCards, setNumCards] = useState([]);

    function changeData(getData) {
        console.debug("DEBUG -> getData", getData);
        try {
            getData = JSON.parse(p2e(JSON.stringify(getData)));
            const objIndex = productsData.findIndex(
                (obj) => obj.id === getData.id
            );
            if (objIndex >= 0) {
                productsData[objIndex] = getData;
            } else if (
                getData.productName &&
                getData.price &&
                getData.quantity
            ) {
                productsData.push(getData);
            }
        } catch {}
        console.debug("DEBUG -> productsData", productsData);

        let totalPriceScope = 0;
        console.log(productsData);
        productsData.forEach(({ price, quantity }) => {
            price = price ? parseFloat(price) : 0;
            quantity = quantity ? parseFloat(quantity) : 0;
            totalPriceScope += price * quantity;
        });
        setTotalPrice(totalPriceScope);
        setGeneratePdf(false);
    }

    function addCard(e) {
        e.preventDefault();
        setNumCards(
            numCards.concat(
                <ProductCard
                    id={generateId()}
                    key={numCards.length++}
                    getData={(data) => changeData(data)}
                />
            )
        );
    }

    useEffect(() => {
        // productsData = [];
        // queryJson = {};
        return () => {
            productsData = [];
            queryJson = {};
            console.log("EXIT", productsData.length);
        };
    }, []);

    useEffect(() => {
        productsData = [];
        try {
            console.log("START");
            if (window.location.search.slice(1)) {
                queryJson = JSON.parse(
                    decodeURIComponent(window.location.search.slice(1))
                );
            }
            if (queryJson.products) {
                console.log("YES");
                console.log(queryJson);
                setInvoiceNumber(queryJson.invoiceNumber);
                setDate(queryJson.date);
                setName(queryJson.name);
                setGender(queryJson.gender);
                productsData = queryJson.products;
                const productsElements = productsData.map((product) => (
                    <ProductCard
                        id={generateId()}
                        key={numCards.length++}
                        getData={(data) => changeData(data)}
                        setData={product}
                    />
                ));
                setNumCards(numCards.concat(productsElements));
                changeData();
            } else {
                setNumCards(
                    numCards.concat(
                        <ProductCard
                            id={generateId()}
                            key={numCards.length++}
                            getData={(data) => changeData(data)}
                        />
                    )
                );
            }
        } catch {}

        return () => {
            productsData = [];
        };
    }, []);

    useEffect(() => {
        let recentHistory = JSON.parse(localStorage.getItem("history"));
        if (recentHistory) {
            const objIndex = recentHistory.findIndex(
                (obj) => obj.invoiceNumber === invoiceNumber
            );
            if (objIndex >= 0) {
                setEditingNum(recentHistory[objIndex].invoiceNumber);
            } else {
                setEditingNum("");
            }
        }
    }, [invoiceNumber]);

    return (
        <div className="container max-w-xl mt-16">
            <form className="py-6">
                <div className="flex gap-4 mb-6">
                    <Input
                        value={invoiceNumber}
                        type={"tel"}
                        id={"invoice_number"}
                        className={"flex-1"}
                        label="شماره صورتحساب"
                        placeholder={"1-2-3"}
                        ltr={true}
                        onChange={(e) =>
                            setInvoiceNumber(e.target.value) ||
                            setGeneratePdf(false)
                        }
                    />
                    <Input
                        value={date}
                        type={"tel"}
                        id={"date"}
                        className={"flex-1"}
                        label="تاریخ"
                        placeholder={today}
                        ltr={true}
                        onChange={(e) =>
                            setDate(e.target.value) || setGeneratePdf(false)
                        }
                    />
                </div>
                <div className="flex gap-4 mb-6">
                    <Input
                        id={"name"}
                        className={"flex-[3]"}
                        value={name}
                        label="نام و نام خانوادگی مشتری"
                        placeholder={"علی نادری"}
                        onChange={(e) =>
                            setName(e.target.value) || setGeneratePdf(false)
                        }
                    />
                    <div className="flex-[2] flex flex-col justify-between">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor={"gender"}
                        >
                            جنسیت
                        </label>
                        <select
                            id="gender"
                            onChange={(e) =>
                                setGender(e.target.value) ||
                                setGeneratePdf(false)
                            }
                            className="block w-full text-gray-700 bg-white placeholder:text-gray-300 border border-gray-300 focus:border-gray-500 rounded py-[0.57rem] px-4 leading-tight focus:outline-none focus:bg-white"
                        >
                            <option selected={gender === "آقا"}>آقا</option>
                            <option selected={gender === "خانم"}>خانم</option>
                            <option selected={gender === "هیچکدام"}>
                                هیچکدام
                            </option>
                        </select>
                    </div>
                </div>
                <div className="border rounded-xl px-3 mb-24 flex flex-col mt-10">
                    <span className="w-fit px-2 tracking-wide text-gray-700 font-bold mb-2 bg-white -mt-3">
                        اطلاعات محصولات
                    </span>
                    <div className="flex flex-col gap-3">{numCards}</div>
                    <a
                        className="-mb-4 mt-3 rounded-md inline-block w-fit bg-white text-primary border border-primary px-4 py-2 text-xs"
                        href="/"
                        onClick={addCard}
                    >
                        + افزودن
                    </a>
                </div>
                <div className=" fixed bottom-0 right-0  w-full z-10">
                    <AnimateHeight height={editingNum ? "auto" : 0}>
                        <p
                            className={
                                "bg-primary/70 backdrop-blur-lg text-center text-xs px-4 py-1" +
                                (editingNum
                                    ? " text-white"
                                    : " text-transparent")
                            }
                        >
                            شما در حال ویرایش صورتحساب شماره{" "}
                            <span dir="ltr">{e2p(editingNum)}</span> می‌باشید
                        </p>
                    </AnimateHeight>

                    <div className="justify-between flex items-center bg-white/70 backdrop-blur-lg border-t px-4 py-3">
                        <div className="flex">
                            {generatePdf && (
                                <PDFDownloadLink
                                    id={"dsds"}
                                    className={
                                        "rounded-md inline-block w-fit bg-primary px-5 py-2.5 text-sm font-semibold text-white " +
                                        (loading && " animate-pulse")
                                    }
                                    document={
                                        <MyDocument
                                            invoiceNumber={invoiceNumber}
                                            date={date}
                                            name={name}
                                            gender={gender}
                                            products={productsData}
                                        />
                                    }
                                    fileName={`پیش فاکتور معماریکا - ${
                                        gender === "آقا" ? "آقای" : ""
                                    }${
                                        gender === "خانم" ? "خانم" : ""
                                    } ${name}`}
                                >
                                    {({ loading }) => {
                                        setLoading(loading);
                                        return loading
                                            ? "درحال ساخت..."
                                            : "دانلود";
                                    }}
                                </PDFDownloadLink>
                            )}
                            {!loading && (
                                <a
                                    className={
                                        "rounded-md inline-block w-fit px-5 py-2.5 text-sm font-semibold " +
                                        (generatePdf
                                            ? "text-red-600"
                                            : "bg-primary text-white")
                                    }
                                    href="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setGeneratePdf(!generatePdf);
                                    }}
                                >
                                    {!generatePdf ? "ساخت PDF" : "حذف"}
                                </a>
                            )}
                        </div>
                        <span>
                            {totalPrice.toLocaleString("fa-IR") + " تومان"}
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Form;
