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
    homeUsers: Array<HomeUser>
    banner: Banner
    announcements: Array<Announcement>
}

export default function Home(props: Props) {
    console.log(props);

    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [pendapatan, setPendapatan] = useState<number>(0)
    const [kelompok, setKelompok] = useState<number>(0)
    const [dana, setDana] = useState<number>(0)
    const [realisasi, setRealisasi] = useState<number>(0)
    function getData() {
        axios.get(`/data/${year}`).then((e) => {
            console.log(e)
            setDana(e.data.dana)
            setRealisasi(e.data.realisasi)
            setKelompok(e.data.group)
            setPendapatan(e.data.pendapatan)
        }).catch((er) => console.log(er));

    }

    useEffect(() => {
        if (year != null) {
            getData()
        }
        return
    }, [year])

    return (
        <Guest banner={props.banner}>
            <div className="my-6 mx-6">
                <div className="gap-6 flex flex-row items-center max-w-fit">
                    <div className="max-w-fit">
                        <ReactDatePicker
                            className="w-min"
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

                    <div className="">
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

                <div className="mt-6">
                    <Carousel
                        autoPlay={true}
                        className="min-w-full">
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
                <div className="mt-6 grid grid-cols-3 grid-flow-row gap-6">
                    <div className="w-full box-border border-collapse border-black border p-6">
                        <b>Pengumuman</b>
                        {
                            props.announcements && props.announcements.map((e, i) => (<p key={i}>{dateToShow(Date.parse(e.date))} - {e.description}</p>))
                        }
                    </div>
                    <div className="col-span-2">
                        <table className="table table-auto w-full">
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
                                    props.homeUsers && props.homeUsers.map((e, i) => {
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
                </div>
            </div>
        </Guest>
    )
}