import { Link } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
interface BackProps {
    route: string
}

export function BackButton(routes: BackProps) {
    return (
        <div className='container pb-3'>
            <Link
                className="text-kemenag"
                href={route(`${routes.route}.index`)}>
                Kembali
            </Link>
        </div>
    )
}