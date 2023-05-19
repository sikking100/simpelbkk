import NavLink from "@/Component/NavLink";
import { PagesProps } from "@/Inteface/Global";
import { User } from "@/Inteface/User";
import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import route from "ziggy-js";

interface Props extends PagesProps {

    header?: string
}



export default function Authenticated({ auth, errors, header, children }: React.PropsWithChildren<Props>) {
    const [act, setAct] = useState(false)


    const class1 = act === true ? 'col-span-2' : 'col-span-1'

    const class2 = act === true ? 'col-span-3' : 'col-span-4'
    return (
        <div >
            <div className="bg-white shadow w-full text-primary-dark py-6 px-4 sm:px-6 lg:px-8 inline-flex">
                <img src={'../../assets/logo.png'} className={'h-2/4 max-h-8 pr-6 self-center'} />
                {auth?.user.type === 'desa' ? (
                    <div className="justify-center">
                        <p>{`Kecamatan ${auth?.user.district_name}`}</p>
                        <p>{`Desa ${auth?.user.village_name}`}</p>
                    </div>
                ) : <p className="self-center">DINAS PEMBERDAYAAN MASYARAKAT DAN DESA DAERAH</p>}
                <InertiaLink
                    method='post'
                    as={'button'}
                    href={route('logout')}
                    className={"self-center ml-auto text-red-500"}
                >
                    Logout
                </InertiaLink>
            </div>
            <div className={"min-h-screen bg-gray-100 grid grid-cols-5"}>
                <div className={`py-4 px-6 bg-primary ${class1} md:col-span-1`}>
                    <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative overflow-auto">
                        <div className="flex pb-6 md:hidden">
                            <button
                                type="button"
                                className="bg-gray-800 inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => setAct(!act)}
                            >
                                <span className="sr-only">Open main menu</span>

                                <svg
                                    className="block h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>

                                <svg
                                    className="hidden h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <ul className="flex-col min-w-full flex list-none">
                                <li className="rounded-lg mb-4">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Beranda
                                    </NavLink>
                                </li>
                                {auth?.user.type === 'desa' ? <>
                                    <li className="rounded-lg mb-4">
                                        <NavLink
                                            href={route('group.index')}
                                            active={route().current('group.*')}
                                        >
                                            Kelompok
                                        </NavLink>
                                    </li>

                                    <li className="rounded-lg mb-4">
                                        <NavLink
                                            href={route('realization.index')}
                                            active={route().current('realization.*')}
                                        >
                                            Laporan Realisasi
                                        </NavLink>
                                    </li>
                                    <li className="rounded-lg mb-4">
                                        <NavLink
                                            href={route('income.index')}
                                            active={route().current('income.*')}
                                        >
                                            Laporan Pendapatan
                                        </NavLink>
                                    </li>
                                    <li className="rounded-lg mb-4">
                                        <NavLink
                                            href={route('documentation.index')}
                                            active={route().current('documentation.*')}
                                        >
                                            Dokumentasi
                                        </NavLink>
                                    </li>

                                </> :

                                    <>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('pagu.index')}
                                                active={route().current('pagu.*')}
                                            >
                                                Pagu Anggaran BKK
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('banner.index')}
                                                active={route().current('banner.*')}
                                            >
                                                Banner
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('video.index')}
                                                active={route().current('video.*')}
                                            >
                                                Video
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('announcement.index')}
                                                active={route().current('announcement.*')}
                                            >
                                                Pengumuman
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('district.index')}
                                                active={route().current('district.*')}
                                            >
                                                Kecamatan
                                            </NavLink>
                                        </li>

                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('category.index')}
                                                active={route().current('category.*')}
                                            >
                                                Kategori
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('typeOfAction.index')}
                                                active={route().current('typeOfAction.*')}
                                            >
                                                Tipe Kegiatan
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('opd.index')}
                                                active={route().current('opd.*')}
                                            >
                                                Opd Teknis
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('kabupaten')}
                                                active={route().current('kabupaten')}
                                            >
                                                Profil Usaha
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('kabupaten.list')}
                                                active={route().current('kabupaten.list')}
                                            >
                                                Rekap Kelompok
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('member.list')}
                                                active={route().current('member.list')}
                                            >
                                                Rekap Anggota
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('report.list')}
                                                active={route().current('report.list')}
                                            >
                                                Laporan
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('documentation.list')}
                                                active={route().current('documentation.list')}
                                            >
                                                Dokumen
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-9 md:mb-4">
                                            <NavLink
                                                href={route('user.index')}
                                                active={route().current('user.*')}
                                            >
                                                User
                                            </NavLink>
                                        </li>
                                    </>
                                }


                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`${class2} md:col-span-4`}>
                    {
                        errors && Object.keys(errors).length > 0 && Object.values(errors).map((v, i) => (<div key={i} id="alert-1" className="flex p-4 mt-6 ml-6 mr-6 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-red-700 dark:red-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                                {v}
                            </div>
                        </div>))
                    }
                    <div
                        className="px-4 py-6 m-6 mb-0 bg-white rounded">
                        <h2 className="font-semibold text-xl leading-tight">{header}</h2>

                    </div>
                    <main className={'px-4 py-6 m-6 bg-white rounded'}>
                        {children}
                    </main>
                </div>
            </div>
        </div>

    )
}
