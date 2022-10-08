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

    const [totalPrice, setTotalPrice] = useState(0)
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
        const objIndex = allData.findIndex((obj) => obj.id === getData.id);
        if (objIndex >= 0) {
            allData[objIndex] = getData;
        } else {
            allData.push(getData);
        }

        setTotalPrice(0)
        allData.forEach((element) => {
          console.log(element.id, element.price);
            setTotalPrice(totalPrice + (element.price * element.quantity))
        });
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
        <div className="container max-w-xl">
            <form className="py-6">
                <div className="flex gap-4 mb-6">
                    <Input
                        value={invoiceNum}
                        type={"tel"}
                        id={"invoice_number"}
                        className={"flex-1"}
                        label="شماره صورتحساب"
                        placeholder={"1-2-3"}
                        ltr={true}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                    <Input
                        value={today}
                        type={"tel"}
                        id={"date"}
                        className={"flex-1"}
                        label="تاریخ"
                        placeholder={today}
                        ltr={true}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 mb-6">
                    <Input
                        className={"flex-[3]"}
                        label="نام و نام خانوادگی مشتری"
                        placeholder={"علی نادری"}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex-[2] flex flex-col justify-between">
                        <RadioItem
                            checked={true}
                            id={"man"}
                            label={"آقا"}
                            name={"gender"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <RadioItem
                            id={"woman"}
                            label={"خانم"}
                            name={"gender"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <RadioItem
                            id={"none"}
                            label={"هیچکدام"}
                            name={"gender"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                </div>
                <div className="border rounded-xl px-3 mb-24 flex flex-col mt-10">
                    <span className="w-fit px-2 tracking-wide text-gray-700 font-bold mb-2 bg-white -mt-3">
                        اطلاعات محصولات
                    </span>
                    <div className="flex flex-col gap-3">{numCards}</div>
                    <a
                        className="-mb-4 mt-3 rounded-md inline-block w-fit bg-white text-blue-600 border border-blue-600 px-4 py-2 text-xs"
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
                                className="rounded-md inline-block w-fit bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
                                document={
                                    <MyDocument
                                        invoiceNumber={invoiceNumber}
                                        date={date}
                                        name={name}
                                        gender={gender}
                                        products={allData}
                                    />
                                }
                                fileName="somename.pdf"
                            >
                                {({ loading }) =>
                                    loading ? "درحال ساخت..." : "دانلود"
                                }
                            </PDFDownloadLink>
                        )}
                        <a
                            className={
                                "rounded-md inline-block w-fit px-5 py-2.5 text-sm font-semibold " +
                                (generatePdf
                                    ? "text-red-600"
                                    : "bg-blue-600 text-white")
                            }
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                setGeneratePdf(!generatePdf);
                            }}
                        >
                            {!generatePdf ? "ساخت PDF" : "حذف"}
                        </a>
                    </div>
                    <span>
                        {(totalPrice).toLocaleString("fa-IR") + " تومان"}
                    </span>
                </div>
            </form>
        </div>
    );
};
export default Form;
