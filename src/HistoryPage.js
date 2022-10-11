import { useNavigation } from "react-router-dom";
import Header from "./components/header";
import HistoryCard from "./components/recent_history/history_card";

let cards = [];
export default function HistoryPage() {
    const recentHistory = JSON.parse(localStorage.getItem("history"));

    if (recentHistory) {
        recentHistory.reverse();
        cards = recentHistory.map(
            ({ invoiceNumber, date, name, products, gender }) => {
                return (
                    <HistoryCard
                        gender={gender}
                        name={name}
                        date={date}
                        invoiceNumber={invoiceNumber}
                        products={products}
                    />
                );
            }
        );
    }

    return (
        <>
            <Header back={true} textHeader="تاریخچه فاکتورها" />
            <div className="container max-w-xl flex flex-col gap-5 pt-20 pb-10">
                {cards}
            </div>
        </>
    );
}
