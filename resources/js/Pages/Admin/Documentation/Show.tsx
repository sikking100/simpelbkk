import { Documentation } from "@/Inteface/Documentation";
import { PagesProps } from "@/Inteface/Global";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

interface Props extends PagesProps {
    documentation: Documentation
}

export default function Show({ documentation, auth, errors }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={`Detail Dokumentasi`}
        >
            <Head
                title="Detail Dokumentasi" />

            <div className="w-full flex flex-col gap-6 -mx-3 mb-2">
                <img src={`../../../storage/documentations/${documentation.image}`} className="min-w-full mb-6" />
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Kelompok
                    </label>
                    <p>{documentation.group_name}</p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Progress
                    </label>
                    <p>{documentation.progress}</p>
                </div>


                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Keterangan Dokumentasi
                    </label>
                    <p>
                        {documentation.description}
                    </p>
                </div>
            </div>
        </Authenticated>
    )
}
