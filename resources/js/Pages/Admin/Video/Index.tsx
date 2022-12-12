import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { Video } from '@/Inteface/Video'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    videos: Array<Video>
}

export default function Index({ auth, errors, videos, flash }: Props) {
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
            header={'Video'}
        >
            <Head
                title='Video'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('video.create')}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                {videos.length === 0 ? (
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
                                {videos.map((e, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}>
                                        <td>{i + 1}</td>
                                        <td>{e.url}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('video.edit', e.id)}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                            <button
                                                onClick={(r) => {
                                                    r.preventDefault()
                                                    if (confirm("Yakin ingin mengahpus data?")) {
                                                        setShowAlert(true)
                                                        Inertia.delete(route('video.destroy', e.id));
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
