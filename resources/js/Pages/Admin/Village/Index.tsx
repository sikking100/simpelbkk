import Alert from '@/Component/Alert'
import { District } from '@/Inteface/District'
import { PagesProps } from '@/Inteface/Global'
import { Village } from '@/Inteface/Village'
import Authenticated from '@/Layouts/Authenticated'
import { PageProps } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    district: District
    villages: Array<Village>
}

export default function Index({ auth, errors, villages, flash, district }: Props) {
    const [showAlert, setShowAlert] = React.useState(true);

    React.useEffect(() => {
        console.log('initialize interval')
        if (showAlert == false) {
            setShowAlert(true)
        }
        const interval = setInterval(() => {
            if (showAlert == true) {
                setShowAlert(false)
            }
            return
        }, 5000)
        return () => {
            console.log('clearing interval')
            clearInterval(interval)
        }
    }, [])
    console.log(typeof villages);

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={`Kecamatan ${district.name}`}
        >
            <Head
                title='Desa'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('village.create', district.id)}
                className='btn'
            >
                Tambah Desa
            </InertiaLink>
            <div
                className='mt-6'
            >
                {villages.length === 0 ? (
                    <div>
                        <p>Data Kosong</p>
                    </div>
                ) : (
                    <div className='w-full'>
                        <table className='table table-auto w-full border-collapse border border-slate-500'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {villages.map((e, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}>
                                        <td>{i + 1}</td>
                                        <td>{e.name}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('village.edit', [e.district_id, e.id])}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </Authenticated>
    )
}
