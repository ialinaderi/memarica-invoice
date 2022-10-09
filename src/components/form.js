import Input from "./input";
import RadioItem from "./radio_item";
import ProductCard from "./product_card";
import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../document";
let lastId = 0;
let allData = [];

function generateId() {
    lastId++;
    return `${lastId}`;
}

const Form = () => {
    let today = new Date().toLocaleDateString("fa-IR-u-nu-latn");
    let invoiceNum =
        today.split("/")[0].slice(2) + "-" + today.split("/")[1] + "-" + 40;

    const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [generatePdf, setGeneratePdf] = useState(false);
    const [invoiceNumber, setInvoiceNumber] = useState(invoiceNum);
    const [date, setDate] = useState(today);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("آقا");
    const [numCards, setNumCards] = useState([
        <ProductCard
            id={generateId()}
            key={1}
            getData={(data) => changeData(data)}
        />,
    ]);

    function changeData(getData) {
        getData = JSON.parse(p2e(JSON.stringify(getData)));
        console.log(getData);
        const objIndex = allData.findIndex((obj) => obj.id === getData.id);
        if (objIndex >= 0) {
            allData[objIndex] = getData;
        } else {
            allData.push(getData);
        }

        setTotalPrice(0);
        allData.forEach((element) => {
            console.log(element.id, element.price);
            setTotalPrice(totalPrice + element.price * element.quantity);
        });
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

    return (
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
                            setGender(e.target.value) || setGeneratePdf(false)
                        }
                        className="block w-full text-gray-700 bg-white placeholder:text-gray-300 border border-gray-300 focus:border-gray-500 rounded py-[0.57rem] px-4 leading-tight focus:outline-none focus:bg-white"
                    >
                        <option>آقا</option>
                        <option>خانم</option>
                        <option>هیچکدام</option>
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
            <div className="bg-white/70 backdrop-blur-lg fixed bottom-0 right-0 border-t w-full px-4 py-3 z-10 justify-between flex items-center">
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
                                    products={allData}
                                />
                            }
                            fileName={`پیش فاکتور معماریکا - ${
                                gender === "آقا" ? "آقای" : ""
                            }${gender === "خانم" ? "خانم" : ""} ${name}`}
                        >
                            {({ loading }) => {
                                setLoading(loading);
                                return loading ? "درحال ساخت..." : "دانلود";
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
                <span>{totalPrice.toLocaleString("fa-IR") + " تومان"}</span>
            </div>
        </form>
    );
};
export default Form;
