import { Link } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
interface BackProps {
    router: string
    id?: number
}

export function BackButton({ router, id }: BackProps) {
    return (
        <div className='container pb-3'>
            <Link
                className="text-kemenag"
                href={id === null || id === undefined ? route(`${router}.index`) : route(`${router}.show`, id)}>
                Kembali
            </Link>
        </div>
    )
}
