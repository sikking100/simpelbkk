import rupiah from "@/Function/function";
import { PagesProps } from "@/Inteface/Global";
import { ReportRecap } from "@/Inteface/ReportRecap";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tsXLXS } from "ts-xlsx-export";
import route from "ziggy-js";

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

    const [showAlert, setShowAlert] = React.useState(true);

    React.useEffect(() => {
        console.log('initialize interval')
        if (showAlert == false) {
            setShowAlert(true)
        }
        const interval = setInterval(() => {
            if (showAlert == true) {
                setShowAlert(false)
            }
            return
        }, 5000)
        return () => {
            console.log('clearing interval')
            clearInterval(interval)
        }
    }, [])
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
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas && datas.map((e, i) => {
                                return (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}>
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
                                        <td>
                                            <button
                                                onClick={(r) => {
                                                    const title = `Yakin ingin ${e.status === 'Aktif' ? 'menonaktifkan' : 'mengaktifkan'} data`
                                                    r.preventDefault()
                                                    if (confirm(title)) {
                                                        setShowAlert(true)
                                                        Inertia.put(route('update.status', e.id));
                                                        getData()
                                                    }
                                                }}
                                                className={e.status === 'Aktif' ? 'btn bg-green-500' : 'btn bg-red-500'}
                                                title={e.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}

                                            >
                                                {e.status}
                                            </button>
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
