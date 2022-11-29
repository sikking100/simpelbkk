import React from 'react'

interface Props {
    message: string
}

export function ErrorText({ message }: Props) {
    return (
        <div>
            {message && <p className="text-red-500 text-xs italic">{message}</p>}
        </div>
    )
}
