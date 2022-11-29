import React, { useEffect, useRef } from "react"

interface Props {
    className?: string
    type: React.HTMLInputTypeAttribute
    value?: string | number | readonly string[] | undefined
    onChange: React.ChangeEventHandler<HTMLInputElement>
    name?: string
    isFocuesd?: boolean
}

export default function Input({ className, type, value, onChange, name, isFocuesd }: Props) {
    const input = useRef() as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        if (isFocuesd) {
            input.current.focus()
        }
    }, [])
    return (
        <input
            type={type}
            name={name}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                className
            }
            ref={input}
            onChange={onChange}
        />
    )
}