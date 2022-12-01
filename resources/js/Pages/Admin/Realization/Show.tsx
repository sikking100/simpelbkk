import { PagesProps } from "@/Inteface/Global";
import { Group } from "@/Inteface/Group";
import Authenticated from "@/Layouts/Authenticated";
import { Head, InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

interface Props extends PagesProps {
    group: Group
}

export default function Show({ group, auth, errors }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={`Kelompok ${group.name}`}
        >
            <Head
                title="Detail Kelompok" />

            <div className="grid grid-rows-4 grid-flow-col -mx-3 mb-2">
                <div className="row-span-3">
                    <img src={`../../../storage/groups/${group.image}`} className="h-2/3 mb-6" />
                </div>
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Profil
                    </label>
                    <p>{group.profil}</p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nama
                    </label>
                    <p>{group.name}</p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Kategori Kelompok
                    </label>
                    <p>{group.category_name}</p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Jenis Kegiatan
                    </label>
                    <p>{group.type_name}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Alamat
                    </label>
                    <p>
                        {group.address}
                    </p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Keterangan Usaha
                    </label>
                    <p>
                        {group.description}
                    </p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Npwp Ketua
                    </label>
                    <p>
                        {group.npwp}
                    </p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        No Hp
                    </label>
                    <p>
                        {group.phone}
                    </p>
                </div>

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Proposal
                    </label>
                    <a href={`../../../storage/groups/${group.proposal}`} className="btn" target={'_blank'}>Lihat</a>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email (opsional)
                    </label>
                    <p>
                        {group.email}
                    </p>
                </div>
            </div>
        </Authenticated>
    )
}
