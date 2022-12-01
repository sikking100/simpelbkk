import rupiah from "@/Function/function";
import { PagesProps } from "@/Inteface/Global";
import { User } from "@/Inteface/User";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export default function Dashboard({ auth, errors }: PagesProps) {

    const [year, setYear] = useState(new Date().getFullYear())
    const [pendapatan, setPendapatan] = useState<number>(0)
    const [kelompok, setKelompok] = useState<number>(0)
    const [dana, setDana] = useState<number>(0)
    const [realisasi, setRealisasi] = useState<number>(0)


    function getData() {
        axios.get(`/dashboard/${year}/desa`).then((e) => {
            console.log(e.data);

            setPendapatan(e.data.totalPendapatan)
            setKelompok(e.data.totalGroup)
            setDana(e.data.totalBantuan)
            setRealisasi(e.data.totalRealisasi)
        }).catch((errors) => console.log(errors));
    }

    useEffect(() => {
        if (year != null) {
            getData()
        }
        return
    }, [year])




    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Dashboard'}
        >
            <Head
                title="Dashboard" />
            <form>
                <DatePicker
                    value={year.toString()}
                    dateFormat={'yyyy'}
                    showYearPicker={true}
                    onChange={(e) => {
                        if (e == null) return
                        const year = e.getFullYear()
                        setYear(year)
                    }}
                />
            </form>
            <div className="grid grid-cols-2 mt-6 gap-6">
                <div
                    className="card-dashboard"
                >
                    Pendapatan Kelompok Penerima Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                    <p>{rupiah(pendapatan)}</p>
                </div>
                <div className="card-dashboard">
                    Total Penerima Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                    <p>
                        {kelompok.toString()}
                    </p>
                </div>
                <div className="card-dashboard">
                    Total Dana Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                    <p>
                        {rupiah(dana)}
                    </p>
                </div>
                <div className="card-dashboard">
                    Realisasi Dana Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                    <p>
                        {rupiah(realisasi)}
                    </p>
                </div>
            </div>
        </Authenticated>
    )
}
