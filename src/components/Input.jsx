export default function Input({ placeholder, nameAndID, type = "text", className = "", withLabel = true, labelText, onChange = () => { }, onKeyUp = () => { }, min, max, value }) {
    return (
        <div className="mb-3">
            {withLabel &&
                <label htmlFor={nameAndID} className="font-bold text-gray-800 block mb-2">{labelText}</label>
            }
            <input type={type} name={nameAndID} id={nameAndID} placeholder={placeholder} className={`p-3 rounded border-2 border-gray-200 focus:border-green-400 outline-none transition focus:shadow-sm ${className}`} value={value} min={min} max={max} onChange={(e) => onChange(e)} onKeyUp={(e) => onKeyUp(e)} />
        </div>
    )
}