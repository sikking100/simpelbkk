
import { InertiaLink, Link } from '@inertiajs/inertia-react'
import React from 'react'

export default function Guest(props: React.PropsWithChildren) {
    return (
        <div className={'mx-auto flex flex-col'}>
            <div className={'bg-primary-dark py-6 px-6 float-right space-x-4 mb-6 inline-flex'} style={{ justifyContent: 'end' }}>
                <Link
                    className={'btn'}
                    href='/#'>
                    DPMD
                </Link>
                <Link
                    className={'btn'}
                    href='/#'>
                    Beranda
                </Link>
                <Link
                    className={'btn'}
                    href='/#'>
                    Login
                </Link>
            </div>
            <img src="../assets/banner.png" alt="" />
            {props.children}
            <div className="bg-primary-dark">
                <div className="px-5 text-white py-6">
                    Copyright &copy;2022 Dinas Pemberdayaan Masyarakat dan Desa Daerah Kabupaten Morowali Utara - CV. Buana Power
                </div>
            </div>
        </div>
    )
}