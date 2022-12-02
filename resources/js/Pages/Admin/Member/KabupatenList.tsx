import rupiah from "@/Function/function";
import { PagesProps } from "@/Inteface/Global";
import { HomeUser } from "@/Inteface/HomeUser";
import { MemberRecap } from "@/Inteface/MemberRecap";
import Authenticated from "@/Layouts/Authenticated";
import React from "react";

interface Props extends PagesProps {
    memberRecap: Array<MemberRecap>
}

export default function KabupatenList({ auth, errors, memberRecap }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header="Rekap Kelompok"
        >
            <div>
                <button className="btn">Export Excel</button>
                <table className="mt-6 table table-auto w-full">
                    <thead>
                        <tr>
                            <th>Kecamatan</th>
                            <th>Desa</th>
                            <th>Kelompok</th>
                            <th>Nama</th>
                            <th>Jabatan</th>
                            <th>Nik</th>
                            <th>Pendidikan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            memberRecap && memberRecap.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {e.kecamatan}
                                        </td>
                                        <td>
                                            {e.desa}
                                        </td>
                                        <td>
                                            {e.group}
                                        </td>
                                        <td>
                                            {e.name}
                                        </td>
                                        <td>
                                            {e.type}
                                        </td>
                                        <td>
                                            {e.nik}
                                        </td>
                                        <td>
                                            {e.pendidikan}
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Authenticated>
    )
}
