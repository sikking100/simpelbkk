import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { TypeOfAction } from '@/Inteface/TypeOfAction'
import Authenticated from '@/Layouts/Authenticated'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    types: Array<TypeOfAction>
}

export default function Index({ auth, errors, types, flash }: Props) {
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
            header={'Tipe Kegiatan'}
        >
            <Head
                title='Tipe Kegiatan'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('typeOfAction.create')}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                {types.length === 0 ? (
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
                                {types.map((e, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{e.name}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('typeOfAction.edit', e.id)}
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
