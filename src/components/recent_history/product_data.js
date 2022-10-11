export default function ProductData({ name, brand, quantity, unit, price }) {
    return (
        <div className="flex flex-col w-full text-gray-700 bg-white rounded py-3 px-4 leading-tight gap-5 overflow-hidden">
            <div>
                <span className="text-xs font-bold ">نام محصول</span>
                <p className="mt-1">{name}</p>
            </div>
            <div className="opacity-50">
                <span className="text-xs font-bold ">برند</span>
                <p className="mt-1">{brand ? brand : "——"}</p>
            </div>
            <div className="opacity-50">
                <span className="text-xs font-bold ">مقدار</span>
                <p className="mt-1">{`${parseFloat(quantity).toLocaleString(
                    "fa-IR"
                )} ${unit}`}</p>
            </div>
            <div className="opacity-50">
                <span className="text-xs font-bold">قیمت</span>
                <p className="mt-1">{`${parseFloat(price).toLocaleString(
                    "fa-IR"
                )} تومان`}</p>
            </div>
            <div className="bg-gray-50 -mx-4 -mb-3 px-4 py-2">
                <span className="text-xs font-bold">مجموع</span>
                <p className="mt-1 font-medium">{`${(
                    parseFloat(price) * parseFloat(quantity)
                ).toLocaleString("fa-IR")} تومان`}</p>
            </div>
        </div>
    );
}
