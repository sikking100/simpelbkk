
import { Banner } from '@/Inteface/Banner'
import { defImage } from '@/Inteface/DefImage'
import { InertiaLink, Link } from '@inertiajs/inertia-react'
import React from 'react'

interface Props {
    banner: Banner
}

export default function Guest(props: React.PropsWithChildren<Props>) {
    return (
        <div className={'w-full'}>
            <div className={'bg-primary-dark py-6 px-6 float-right space-x-4 mb-6 inline-flex w-full'} style={{ justifyContent: 'end' }}>
                <Link
                    className={'btn'}
                    href='https://pemdes.morowaliutarakab.go.id'>
                    DPMD
                </Link>
                <Link
                    className={'btn'}
                    href='/'>
                    Beranda
                </Link>
                <Link
                    className={'btn'}
                    href='/login'>
                    Login
                </Link>
            </div>
            <img src={props.banner !== null ? `../storage/banner/${props.banner.image}` : defImage} alt="" />
            <main>
                {props.children}
            </main>
            <div className="bg-primary-dark">
                <div className="px-5 text-white py-6">
                    Copyright &copy;2022 Dinas Pemberdayaan Masyarakat dan Desa Daerah Kabupaten Morowali Utara - CV. Buana Power
                </div>
            </div>
        </div>
    )
}
