import { faArrowLeft, faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header({ back = false, textHeader }) {
    return (
        <nav className="border-b h-14 flex w-full px-4 py-2 gap-4 shadow items-center bg-gray-50 fixed top-0 z-10">
            {!back ? (
                <Link to={"/history"}>
                    <FontAwesomeIcon
                        className="text-primary text-xl flex"
                        icon={faHistory}
                    />
                </Link>
            ) : (
                <FontAwesomeIcon
                    className="text-transparent text-xl flex"
                    icon={faArrowLeft}
                />
            )}
            <h1
                className={
                    "flex items-center text-primary font-bold  w-full text-center justify-center"
                }
            >
                {textHeader ? textHeader : "صدور پیش‌فاکتور معماریکا"}
            </h1>
            {!back ? (
                <FontAwesomeIcon
                    className="text-transparent text-xl flex"
                    icon={faHistory}
                />
            ) : (
                <Link to={"/"}>
                    <FontAwesomeIcon
                        className="text-primary text-xl flex"
                        icon={faArrowLeft}
                    />
                </Link>
            )}
        </nav>
    );
}
export default Header;
