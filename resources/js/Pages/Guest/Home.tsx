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
import ReactPlayer from 'react-player'
import { Video } from "@/Inteface/Video";
import ImageGallery, { ReactImageGalleryItem, ReactImageGalleryImageSet } from 'react-image-gallery'

interface Props extends PagesProps {
    documentations: Array<Documentation>
    banner: Banner
    announcements: Array<Announcement>
    videos: Array<Video>
}

export default function Home(props: Props) {
    console.log(props);

    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [yearBottom, setYearBottom] = useState<number>(new Date().getFullYear())
    const [name, setName] = useState<string>()
    const [pendapatan, setPendapatan] = useState<number>(0)
    const [kelompok, setKelompok] = useState<number>(0)
    const [dana, setDana] = useState<number>(0)
    const [pagu, setPagu] = useState<number>(0)
    const [realisasi, setRealisasi] = useState<number>(0)
    const [homeUsers, setHomeUsers] = useState<Array<HomeUser>>([])
    const [progress, setProgress] = useState<string>()
    function getData() {
        axios.get(`/data/${year}`).then((e) => {
            console.log(e)
            setPagu(e.data.pagu)
            setDana(e.data.dana)
            setRealisasi(e.data.realisasi)
            setKelompok(e.data.group)
            setPendapatan(e.data.pendapatan)
        }).catch((er) => console.log(er));

    }

    function getDataBottom() {
        axios.get(`/data/${yearBottom}/bottom`).then((e) => {
            console.log(e.data)
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


    const YoutubeSlide = ({ url, isSelected }: { url: string, isSelected: boolean }) => (<ReactPlayer
        width={'100%'}
        className={'react-player w-full'}
        height={'500px'}
        playing={isSelected}
        url={url}
    />)

    const getVideoId = (url: string) => {
        if (url.includes("https://youtu.be/")) {
            return url.substring('https://youtu.be/'.length, url.length);
        }
        if (url.includes('https://youtube.com')) {
            return url.substring('https://youtube.com/watch?v='.length, url.length);
        }
        return url.substring('https://www.youtube.com/watch?v='.length, url.length);
    };

    const getVideoThumb = (videoId: string) => `https://img.youtube.com/vi/${videoId}/default.jpg`

    const customRenderThumb = (children: any[]) => children.map(item => {
        const videoId = getVideoId(item?.props.url)
        return <img key={videoId} src={getVideoThumb(videoId)} />
    })


    const images: ReactImageGalleryItem[] = props.documentations.filter((e, i) => e.progress === progress).map((e, i) => {

        return {
            original: `../storage/documentations/${e.image}`,
            thumbnail: `../storage/documentations/${e.image}`,

        }
    });

    const prgrsPencairanDana = pagu === 0 ? 0 : (dana / pagu * 100);
    return (
        <Guest banner={props.banner}>
            <div className="my-6 mx-6">
                <div className="gap-6 flex flex-col md:flex-row md:items-center max-w-fit">
                    <div className="max-w-full">
                        <ReactDatePicker
                            className="md:w-min w-full form-input"
                            dateFormat={'yyyy'}
                            value={year.toString()}
                            showYearPicker={true}
                            selected={new Date(year.toString())}
                            onChange={(e) => {
                                if (e !== null) {
                                    setYear(e.getFullYear())
                                }
                            }}
                        />
                    </div>
                    <div className="card-dashboard bg-primary-dark">
                        <p>PAGU ANGGARAN BKK</p>
                        <p>
                            {rupiah(pagu)}
                        </p>
                    </div>
                    <div className="card-dashboard bg-primary-dark">
                        <p>DANA BKK SUDAH TERSALURKAN</p>
                        <p>
                            {`${prgrsPencairanDana.toFixed(2)} %`}
                        </p>
                    </div>
                    <div className="card-dashboard bg-primary">
                        <p>REALISASI DANA BKK</p>
                        <p>
                            {rupiah(realisasi)}
                        </p>
                    </div>
                    <div className="card-dashboard bg-blue-600">
                        <p>JUMLAH KELOMPOK PENERIMA DANA BKK</p>
                        <p>
                            {kelompok}
                        </p>
                    </div>
                    <div className="card-dashboard bg-green-300">
                        <p>PENDAPATAN KELOMPOK DANA BKK</p>
                        <p>
                            {rupiah(pendapatan)}
                        </p>
                    </div>
                </div>

                <div className="mt-6 player-wrapper h-1/2">
                    <Carousel
                        renderThumbs={customRenderThumb}
                        showStatus={false}
                        width={'100%'}
                        dynamicHeight={true}
                        className={'m-0'}
                    >
                        {props.videos.map(v => (
                            <YoutubeSlide
                                key={v.id}
                                isSelected={false}
                                url={v.url}
                            />
                        ))}
                    </Carousel>
                </div>

                <div className="mt-6 grid grid-cols-8">
                    <div className="pb-6 pr-6 gap-6 col-span-1 flex flex-col">
                        <span className="text-xl font-bold">Progress</span>
                        <button className="btn" onClick={() => setProgress('25%')}>25%</button>
                        <button className="btn" onClick={() => setProgress('50%')}>50%</button>
                        <button className="btn" onClick={() => setProgress('75%')}>75%</button>
                        <button className="btn" onClick={() => setProgress('100%')}>100%</button>
                    </div>
                    <div
                        className="col-span-7">
                        <ImageGallery
                            items={images}
                            autoPlay={true}
                            infinite={true}
                            showBullets={false}
                            showPlayButton={false}
                            showThumbnails={false}
                        />
                    </div>
                </div>
                <div className="mt-6 md:grid md:grid-flow-cols gap-6">

                    {/* <Carousel
                        autoPlay={true}
                        className="min-w-full mt-6 md:mt-0 md:col-span-2">
                        {
                            props.documentations && props.documentations.map((e, i) => {
                                return (
                                    <div key={i} className={'mx-auto'}>
                                        <img src={`../storage/documentations/${e.image}`} alt="" className="min-w-full" />
                                    </div>
                                )
                            })
                        }
                    </Carousel> */}


                    <div className="md:w-full box-border border-collapse border-black border p-6 md:col-span-2">
                        <b>Pengumuman</b>
                        <div className="h-64 md:h-50 overflow-scroll">
                            <table
                                className="table table-auto"
                            >
                                <thead>
                                    <tr>
                                        <th>Dari Tanggal</th>
                                        <th>S/D Tanggal</th>
                                        <th>Lokasi</th>
                                        <th>Jenis Kegiatan</th>
                                        <th>Peserta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.announcements && props.announcements.map(e => (
                                            <tr key={e.id}>
                                                <td>{dateToShow(Date.parse(e.begin))}</td>
                                                <td>{dateToShow(Date.parse(e.end))}</td>
                                                <td>
                                                    {e.location}
                                                </td>
                                                <td>
                                                    {e.type}
                                                </td>
                                                <td>
                                                    {e.participant}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="flex flex-auto">
                            <ReactDatePicker
                                className="md:w-min w-full form-input"
                                dateFormat={'yyyy'}
                                value={yearBottom.toString()}
                                showYearPicker={true}
                                selected={new Date(year.toString())}
                                onChange={(e) => {
                                    if (e !== null) {
                                        setYearBottom(e.getFullYear())
                                    }
                                }}
                            />
                            <input
                                className="w-7/12 form-input"
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
        </Guest >
    )
}
