function RadioItem({ name, id, label, checked, onChange }) {
    return (
        <div className="flex items-center">
            <input
                value={label}
                defaultChecked={checked}
                onChange={onChange}
                id={id}
                type="radio"
                name={name}
                className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300"
            />
            <label htmlFor={id} className="mr-2 text-sm font-medium text-gray-900">
                {label}
            </label>
        </div>
    );
}
export default RadioItem;
