import Alert from '@/Component/Alert'
import { Documentation } from '@/Inteface/Documentation'
import { PagesProps } from '@/Inteface/Global'
import { Group } from '@/Inteface/Group'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    groups: Array<Group>
}

export default function Index({ auth, errors, groups, flash }: Props) {
    const [showAlert, setShowAlert] = useState(true);
    const [documentations, setDocumentation] = useState<Array<Documentation>>([])

    useEffect(() => {
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

    function getData(id: number) {
        console.log(id);

        axios.get(`/group/${id}/documentations`).then((e) => {
            const v = e.data.documentations as Array<Documentation>
            setDocumentation(v)
        }).catch((e) => console.log(e));
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '0') {
            setDocumentation([])
            return
        }
        getData(Number.parseInt(e.target.value))
        return
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Dokumentasi'}
        >
            <Head
                title='Dokumentasi'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('documentation.create')}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                <select onChange={handleChange} >
                    <option value="0">-- Pilih Kelompok --</option>
                    {groups.map((e, i) => (<option value={e.id} key={i}>{e.name}</option>))}
                </select>
                {documentations.length === 0 ? (
                    <div className='mt-6'>
                        <p>Data Kosong</p>
                    </div>
                ) : (
                    <div className='w-full'>
                        <table className='mt-6 table table-auto w-full border-collapse border border-slate-500'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Progress</th>
                                    <th>Keterangan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentations.map((e, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{e.progress}</td>
                                        <td>{e.description}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('documentation.show', e.id)}
                                                className='btn bg-orange-500'>
                                                Lihat
                                            </InertiaLink>
                                            <InertiaLink
                                                href={route('documentation.edit', e.id)}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                            <button
                                                onClick={(r) => {
                                                    r.preventDefault()
                                                    if (confirm("Yakin ingin mengahpus data?")) {
                                                        setShowAlert(true)
                                                        Inertia.delete(route('documentation.destroy', e.id));
                                                        setDocumentation([])
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
