import { DokumenRecap } from "@/Inteface/DokumenRecap";
import { PagesProps } from "@/Inteface/Global";
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
    const [datas, setDatas] = useState<Array<DokumenRecap>>([])
    const getData = () => axios.get(`/documentation/${year}/list`).then(e => {
        console.log(e);

        setDatas(e.data)
    }).catch(e => console.log(e))
    useEffect(() => {
        getData()
        return
    }, [year])

    const handleClick = () => tsXLXS().exportAsExcelFile(datas).saveAsExcelFile(`RekapDokumen${year}`)

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header="Rekap Dokumen"
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
                <button className="btn" onClick={handleClick}>Unduh Rekap Dokumen</button>

                <table className="mt-6 table table-auto w-full">
                    <thead>
                        <tr>
                            <th>Kecamatan</th>
                            <th>Desa</th>
                            <th>Kelompok</th>
                            <th>Lampiran</th>
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
                                            <div
                                                className="flex gap-6 flex-col w-fit"
                                            >
                                                <a href={`../../../storage/groups/${e.proposal}`} className={'btn'} target={'_blank'}>Unduh Proposal</a>
                                                {e.dokumentasi25 && <a href={`../../../storage/documentations/${e.dokumentasi25}`} className={'btn'} target={'_blank'}>Unduh Dokumentasi 25%</a>}
                                                {e.dokumentasi50 && <a href={`../../../storage/documentations/${e.dokumentasi50}`} className={'btn'} target={'_blank'}>Unduh Dokumentasi 50%</a>}
                                                {e.dokumentasi75 && <a href={`../../../storage/documentations/${e.dokumentasi75}`} className={'btn'} target={'_blank'}>Unduh Dokumentasi 75%</a>}
                                                {e.dokumentasi100 && <a href={`../../../storage/documentations/${e.dokumentasi100}`} className={'btn'} target={'_blank'}>Unduh Dokumentasi 100%</a>}
                                            </div>
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
