"use client"
function Input({ submit, onChange, placeholder, value, type, className, name, ...rest }) {

    const varClass = `bg-inherit block rounded-md shadow-sm  text-sm focus:z-10 
      bg-transparent  placeholder-primary
     ${className}`

    return (
        <>
            {type === "submit" ?
                <input className={varClass}
                    onClick={submit}
                    placeholder={placeholder}
                    type="submit"
                    value={placeholder}
                    {...rest}
                />
                :
                <input
                    className={varClass}
                    name={name || ""}
                    type={type || "text"}
                    onChange={(e) => onChange(prev => ({ ...prev, value: e.target.value, }))}
                    value={value}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...rest}
                />}

        </>
    )
}
export default Input