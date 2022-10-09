import "./App.css";
import Form from "./components/form";

const App = () => (
    <>
        <nav className="border-b h-14 flex w-full px-4 py-2 gap-4 shadow bg-gray-50">
            <h1
                className={
                    "flex items-center text-primary font-bold  w-full text-center justify-center"
                }
            >
                صدور پیش‌فاکتور معماریکا
            </h1>
        </nav>
        <div className="container max-w-xl">
            <Form />
        </div>
    </>
);

export default App;
