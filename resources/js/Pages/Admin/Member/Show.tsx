import { PagesProps } from "@/Inteface/Global";
import { Member } from "@/Inteface/Member";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

interface Props extends PagesProps {
    member: Member
}

export default function Show({ member, auth, errors }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={`Anggota Kelompok ${member.group_name}`}
        >
            <Head
                title="Detail Kelompok" />

            <div className="grid grid-rows-4 grid-flow-col -mx-3 mb-2">
                <div className="row-span-3">
                    <img src={`../../../storage/members/${member.image}`} className="h-2/3 mb-6" />
                </div>
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Keterangan
                    </label>
                    <p>
                        {member.description}
                    </p>
                </div>
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Alamat
                    </label>
                    {member.address}
                </div>

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nik
                    </label>
                    <p>
                        {member.nik}
                    </p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nama
                    </label>
                    <p>
                        {member.name}
                    </p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Pendidikan
                    </label>
                    <p>
                        {member.pendidikan}
                    </p>
                </div>

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        No Hp
                    </label>
                    <p>
                        {member.phone}
                    </p>
                </div>
            </div>
        </Authenticated>
    )
}
