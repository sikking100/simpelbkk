import rupiah from "@/Function/function";
import { PagesProps } from "@/Inteface/Global";
import { ReportRecap } from "@/Inteface/ReportRecap";
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
    const [datas, setDatas] = useState<Array<ReportRecap>>([])
    const getData = () => axios.get(`/report/${year}/list`).then(e => {
        console.log(e);

        setDatas(e.data)
    }).catch(e => console.log(e))
    useEffect(() => {
        getData()
        return
    }, [year])

    const handleClick = () => tsXLXS().exportAsExcelFile(datas).saveAsExcelFile(`RekapLaporan${year}`)

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header="Rekap Laporan"
        >
            <div>
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
                            <th>Besar Bantuan</th>
                            <th>Jenis Kegiatan</th>
                            <th>Realisasi</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas && datas.map((e, i) => {
                                return (
                                    <tr key={i}>
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
                                            {rupiah(e.bantuan)}
                                        </td>
                                        <td>
                                            {e.jenis}
                                        </td>
                                        <td>
                                            {rupiah(e.realisasi)}
                                        </td>
                                        <td>
                                            {e.keterangan}
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
