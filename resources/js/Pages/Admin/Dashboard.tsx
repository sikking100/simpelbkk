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
        axios.get(`/dashboard/${year}/data`).then((e) => {
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
                <div className="appearance-none w-min bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight flex">
                    <DatePicker
                        className="w-min border-none bg-transparent p-0"
                        value={year.toString()}
                        dateFormat={'yyyy'}
                        showYearPicker={true}
                        onChange={(e) => {
                            if (e == null) return
                            const year = e.getFullYear()
                            setYear(year)
                        }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>

            </form>
            <div className="grid grid-cols-2 mt-6 gap-6">
                <div
                    className={"card-dashboard border-l-blue-600 border-l-8 shadow-sm shadow-black"}
                >
                    <p className="text-blue-600">Pendapatan Kelompok Penerima Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}</p>
                    <p className="md:text-2xl">{rupiah(pendapatan)}</p>
                </div>
                <div className="card-dashboard border-l-green-600 border-l-8 shadow-sm shadow-black">
                    <p className="text-green-600">Total Penerima Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}</p>
                    <p className="md:text-2xl">
                        {kelompok.toString()}
                    </p>
                </div>
                <div className="card-dashboard border-l-cyan-500 border-l-8 shadow-sm shadow-black">
                    <p className="text-cyan-500">Total Dana Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}</p>
                    <p className="md:text-2xl">
                        {rupiah(dana)}
                    </p>
                </div>
                <div className="card-dashboard border-l-yellow-400 border-l-8 shadow-sm shadow-black">
                    <p className="text-yellow-400">Realisasi Dana Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}</p>
                    <p className="md:text-2xl">
                        {rupiah(realisasi)}
                    </p>
                </div>
            </div>
        </Authenticated>
    )
}
