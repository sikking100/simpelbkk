import rupiah, { dateToShow } from "@/Function/function";
import { PagesProps } from "@/Inteface/Global";
import Guest from "@/Layouts/Guest";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Documentation } from "@/Inteface/Documentation";
import { HomeUser } from "@/Inteface/HomeUser";
import { Banner } from "@/Inteface/Banner";
import { Announcement } from "@/Inteface/Announcement";

interface Props extends PagesProps {
    documentations: Array<Documentation>
    banner: Banner
    announcements: Array<Announcement>
}

export default function Home(props: Props) {
    console.log(props);

    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [yearBottom, setYearBottom] = useState<number>(new Date().getFullYear())
    const [name, setName] = useState<string>()
    const [pendapatan, setPendapatan] = useState<number>(0)
    const [kelompok, setKelompok] = useState<number>(0)
    const [dana, setDana] = useState<number>(0)
    const [realisasi, setRealisasi] = useState<number>(0)
    const [homeUsers, setHomeUsers] = useState<Array<HomeUser>>([])
    function getData() {
        axios.get(`/data/${year}`).then((e) => {
            console.log(e)
            setDana(e.data.dana)
            setRealisasi(e.data.realisasi)
            setKelompok(e.data.group)
            setPendapatan(e.data.pendapatan)
        }).catch((er) => console.log(er));

    }

    function getDataBottom() {
        axios.get(`/data/${yearBottom}/bottom`).then((e) => {
            console.log(e)
            setHomeUsers(e.data)
        }).catch((er) => console.log(er));
    }

    function getDataSearchBottom() {
        axios.get(`/data/${name}/bottom`).then((e) => {
            console.log(e)
            setHomeUsers(e.data)
        }).catch((er) => console.log(er));
    }


    useEffect(() => {
        if (year != null) {
            getData()
        }
        return
    }, [year])

    useEffect(() => {
        if (yearBottom != null) {
            getDataBottom()
        }
        return
    }, [yearBottom])


    useEffect(() => {
        if (name != null && name.length > 5) {

            getDataSearchBottom()
        }
        return
    }, [name])

    return (
        <Guest banner={props.banner}>
            <div className="my-6 mx-6">
                <div className="gap-6 flex flex-col md:flex-row md:items-center max-w-fit">
                    <div className="max-w-full">
                        <ReactDatePicker
                            className="md:w-min w-full"
                            dateFormat={'yyyy'}
                            value={year.toString()}
                            showYearPicker={true}
                            onChange={(e) => {
                                if (e !== null) {
                                    setYear(e.getFullYear())
                                }
                            }}
                        />
                    </div>

                    <div className="float-right">
                        <p>TOTAL DANA BKK</p>
                        <p>
                            {rupiah(dana)}
                        </p>
                    </div>
                    <div className="">
                        <p>REALISASI DANA BKK</p>
                        <p>
                            {rupiah(realisasi)}
                        </p>
                    </div>
                    <div className="">
                        <p>TOTAL PENERIMA DANA BKK</p>
                        <p>
                            {kelompok}
                        </p>
                    </div>
                    <div className="">
                        <p>PENDAPATAN KELOMPOK PENERIMA DANA BKK</p>
                        <p>
                            {rupiah(pendapatan)}
                        </p>
                    </div>
                </div>

                <div className="mt-6 md:grid md:grid-cols-3 md:grid-flow-row gap-6">
                    <div className="md:w-full box-border border-collapse border-black border p-6">
                        <b>Pengumuman</b>
                        <div className="h-24 md:h-50 overflow-scroll">
                            {
                                props.announcements && props.announcements.map((e, i) => (<p key={i}>{dateToShow(Date.parse(e.date))} - {e.description}</p>))
                            }
                        </div>
                    </div>
                    <Carousel
                        autoPlay={true}
                        className="min-w-full mt-6 md:mt-0 md:col-span-2 ">
                        {
                            props.documentations && props.documentations.map((e, i) => {
                                return (
                                    <div key={i} className={'mx-auto'}>
                                        <img src={`../storage/documentations/${e.image}`} alt="" className="min-w-full" />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="flex flex-auto">
                            <ReactDatePicker
                                className="md:w-min w-full"
                                dateFormat={'yyyy'}
                                value={yearBottom.toString()}
                                showYearPicker={true}
                                onChange={(e) => {
                                    if (e !== null) {
                                        setYearBottom(e.getFullYear())
                                    }
                                }}
                            />
                            <input
                                className="w-7/12"
                                type="text"
                                enterKeyHint="search"
                                placeholder="Cari berdasarkan Nama Kelompok atau Nama Desa"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-6 sm:min-w-full overflow-x-auto">
                        <table className="table table-auto md:w-full md:h-50 overflow-scroll">
                            <thead>
                                <tr>
                                    <th>Kecamatan</th>
                                    <th>Desa</th>
                                    <th>Kelompok</th>
                                    <th>Kategori Kelompok</th>
                                    <th>Ketua</th>
                                    <th>No Hp</th>
                                    <th>Besar Bantuan</th>
                                    <th>Pendapatan</th>
                                    <th>Opd Teknis</th>
                                    <th>Status</th>
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
                                                    {e.kelompok}
                                                </td>
                                                <td>
                                                    {e.kategori}
                                                </td>
                                                <td>
                                                    {e.ketua}
                                                </td>
                                                <td>
                                                    {e.phone}
                                                </td>
                                                <td>
                                                    {rupiah(e.bantuan)}
                                                </td>
                                                <td>
                                                    {rupiah(e.pendapatan)}
                                                </td>
                                                <td>
                                                    {e.opd}
                                                </td>
                                                <td>
                                                    <div className={`box ${e.status === 'Aktif' ? 'bg-green-600' : 'bg-red-600'} rounded text-white box px-6 py-2`}>
                                                        {e.status}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
