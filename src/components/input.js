function Input({
    className,
    type,
    ltr,
    id,
    label,
    placeholder,
    pattern,
    value,
    inputClassName,
    onChange,
}) {
    return (
        <div className={className}>
            <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                className={
                    inputClassName +
                    " appearance-none block w-full text-gray-700 bg-white placeholder:text-gray-300 border border-gray-300 focus:border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                }
                id={id}
                name={id}
                dir={ltr ? "ltr" : "rtl"}
                type={type}
                pattern={pattern}
                placeholder={placeholder}
            />
        </div>
    );
}
export default Input;
