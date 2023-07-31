import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { Pagu } from '@/Inteface/Pagu'
import Authenticated from '@/Layouts/Authenticated'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'
import rupiah from '@/Function/function'
import moment from 'moment'
import { Inertia } from '@inertiajs/inertia'


interface Props extends PagesProps {
    pagus: Array<Pagu>
}


export default function Index({ auth, pagus, errors, flash }: Props) {
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
        }, 8000)
        return () => {
            console.log('clearing interval')
            clearInterval(interval)
        }
    }, [])


    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Pagu Anggaran BKK'}
        >
            <Head
                title='Pagu'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('pagu.create')}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                {pagus.length === 0 ? (
                    <div>
                        <p>Data Kosong</p>
                    </div>
                ) : (
                    <div className='w-full overflow-auto'>
                        <table className='table table-auto w-full border-collapse border border-slate-500'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Jumlah</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagus.map((e, i) => (
                                    <tr key={i}  >
                                        <td>{i + 1}</td>
                                        <td>{moment(e.date).format('DD MMMM YYYY')}</td>
                                        <td>{rupiah(e.value)}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('pagu.edit', e.id)}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                            <button
                                                onClick={(r) => {
                                                    r.preventDefault()
                                                    if (confirm("Yakin ingin mengahpus data?")) {
                                                        setShowAlert(true)
                                                        Inertia.delete(route('pagu.destroy', e.id));
                                                    }
                                                }}
                                                className={'btn bg-red-700'}
                                            >
                                                Hapus
                                            </button>
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
