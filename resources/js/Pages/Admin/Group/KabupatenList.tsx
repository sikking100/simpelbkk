import rupiah from "@/Function/function";
import { PagesProps } from "@/Inteface/Global";
import { HomeUser } from "@/Inteface/HomeUser";
import Authenticated from "@/Layouts/Authenticated";
import React from "react";

interface Props extends PagesProps {
    homeUsers: Array<HomeUser>
}

export default function KabupatenList({ auth, errors, homeUsers }: Props) {
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
                            <th>Jenis Kegiatan</th>
                            <th>No Hp</th>
                            <th>Besar Bantuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            homeUsers && homeUsers.map((e, i) => {
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
                                            {e.kegiatan}
                                        </td>
                                        <td>
                                            {e.phone}
                                        </td>
                                        <td>
                                            {rupiah(e.bantuan)}
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
