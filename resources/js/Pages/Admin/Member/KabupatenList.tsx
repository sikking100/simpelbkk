import { PagesProps } from "@/Inteface/Global";
import { MemberRecap } from "@/Inteface/MemberRecap";
import Authenticated from "@/Layouts/Authenticated";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tsXLXS } from "ts-xlsx-export";


interface Props extends PagesProps {
}

export default function KabupatenList({ auth, errors }: Props) {
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [datas, setDatas] = useState<Array<MemberRecap>>([])
    const getData = () => axios.get(`/member/${year}/list`).then(e => {
        console.log(e);

        setDatas(e.data)
    }).catch(e => console.log(e))
    useEffect(() => {
        getData()
        return
    }, [year])

    const handleClick = () => tsXLXS().exportAsExcelFile(datas).saveAsExcelFile(`RekapAnggota${year}`)

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header="Rekap Kelompok"
        >
            <div className=" overflow-auto">
                <ReactDatePicker
                    className="rounded mb-6"
                    value={year?.toString()}
                    showYearPicker={true}
                    onChange={(e) => {
                        if (e === null) return
                        setYear(e.getFullYear())
                    }}
                />
                <button className="btn" onClick={handleClick}>Export Excel</button>
                <table className="mt-6 table table-auto w-full">
                    <thead>
                        <tr>
                            <th>Kecamatan</th>
                            <th>Desa</th>
                            <th>Kelompok</th>
                            <th>Nama</th>
                            <th>Jabatan</th>
                            <th>Nik</th>
                            <th>Pendidikan Terakhir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas && datas.map((e, i) => {
                                return (
                                    <tr key={i}  >
                                        <td>
                                            {e.kecamatan}
                                        </td>
                                        <td>
                                            {e.desa}
                                        </td>
                                        <td>
                                            {e.kelompok}
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
