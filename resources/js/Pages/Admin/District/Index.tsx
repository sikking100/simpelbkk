import Alert from '@/Component/Alert'
import { District } from '@/Inteface/District'
import { PagesProps } from '@/Inteface/Global'
import Authenticated from '@/Layouts/Authenticated'
import { PageProps } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    districts: Array<District>
}

export default function Index({ auth, errors, districts, flash }: Props) {
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
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Kecamatan'}
        >
            <Head
                title='Kecamatan'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('district.create')}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                {districts.length === 0 ? (
                    <div>
                        <p>Data Kosong</p>
                    </div>
                ) : (
                    <div className='w-full overflow-auto'>
                        <table className='table table-auto w-full border-collapse border border-slate-500'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {districts.map((e, i) => (
                                    <tr key={i} >
                                        <td>{i + 1}</td>
                                        <td>{e.name}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('district.edit', e.id)}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                            <InertiaLink
                                                href={route('district.show', e.id)}
                                                className='btn bg-yellow-500'>
                                                Desa
                                            </InertiaLink>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </Authenticated >
    )
}
