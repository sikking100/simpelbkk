import NavLink from "@/Component/NavLink";
import { PagesProps } from "@/Inteface/Global";
import { User } from "@/Inteface/User";
import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";

interface Props extends PagesProps {

    header?: string
}

export default function Authenticated({ auth, errors, header, children }: React.PropsWithChildren<Props>) {

    return (
        <div>
            <div className="bg-white shadow w-full text-primary-dark py-6 px-4 sm:px-6 lg:px-8 inline-flex">
                <img src={'../../assets/logo.png'} className={'h-2/4 max-h-8 pr-6'} />
                <p className="self-center">{auth?.user.name ?? 'DINAS PEMBERDAYAAN MASYARAKAT DAN DESA DAERAH'}</p>
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
                <div className={'py-4 px-6 bg-primary col-span-2 md:col-span-1'}>
                    <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                        <div className="flex flex-col">
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
                                            href={route('dashboard')}
                                            active={route().current('dashboard')}
                                        >
                                            Kelompok
                                        </NavLink>
                                    </li>

                                    <li className="rounded-lg mb-4">
                                        <NavLink
                                            href={route('dashboard')}
                                            active={route().current('dashboard')}
                                        >
                                            Laporan Realisasi
                                        </NavLink>
                                    </li>
                                    <li className="rounded-lg mb-4">
                                        <NavLink
                                            href={route('dashboard')}
                                            active={route().current('dashboard')}
                                        >
                                            Laporan Pendapatan
                                        </NavLink>
                                    </li>
                                    <li className="rounded-lg mb-4">
                                        <NavLink
                                            href={route('dashboard')}
                                            active={route().current('dashboard')}
                                        >
                                            Dokumentasi
                                        </NavLink>
                                    </li>
                                </> :

                                    <>
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
                                                href={route('dashboard')}
                                                active={route().current('dashboard')}
                                            >
                                                Profil Usaha
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('dashboard')}
                                                active={route().current('dashboard')}
                                            >
                                                Rekap Kelompok
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('dashboard')}
                                                active={route().current('dashboard')}
                                            >
                                                Rekap Anggota
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('dashboard')}
                                                active={route().current('dashboard')}
                                            >
                                                Laporan
                                            </NavLink>
                                        </li>
                                        <li className="rounded-lg mb-4">
                                            <NavLink
                                                href={route('dashboard')}
                                                active={route().current('dashboard')}
                                            >
                                                Dokumen
                                            </NavLink>
                                        </li></>
                                }

                                <li className="rounded-lg mb-4">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        Reset Sandi
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 md:col-span-4">
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