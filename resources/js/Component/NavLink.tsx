import { Link } from "@inertiajs/inertia-react";
import React from "react";

interface Props {
    href: string
    active: boolean
}

export default function NavLink({ href, active, children }: React.PropsWithChildren<Props>) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center px-1 pt-1 border-b-2 border-secondary text-xs md:text-sm font-medium leading-5 text-secondary focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs md:text-sm font-medium leading-5 text-gray-200 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
            }
        >
            {children}
        </Link>
    );
}
