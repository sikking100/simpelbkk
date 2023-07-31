import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { Group } from '@/Inteface/Group'
import { Member } from '@/Inteface/Member'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    members: Array<Member>
    group: Group
}

export default function Index({ auth, errors, members, flash, group }: Props) {
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

    const chief = members?.find((v) => v.type === 'ketua');
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={`Anggota Kelompok ${group.name}`}
        >
            <Head
                title='Anggota'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('member.create', group.id)}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                {members.length === 0 ? (
                    <div>
                        <p>Data Kosong</p>
                    </div>
                ) : (
                    <div className='w-full overflow-auto'>
                        <p>Ketua Kelompok</p>
                        <div className='inline-flex gap-6'>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Nama
                                </label>
                                <p>{chief?.name}</p>

                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Nik
                                </label>
                                <p>{chief?.nik}</p>

                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Pendidikan Terakhir
                                </label>
                                <p>{chief?.pendidikan}</p>

                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Alamat
                                </label>
                                <p>{chief?.address}</p>

                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    No Hp
                                </label>
                                <p>{chief?.phone}</p>

                            </div>
                            <div>
                                <label htmlFor="" className="form-label">
                                    Keterangan
                                </label>
                                <p>{chief?.description}</p>

                            </div>
                        </div>
                        <p className='mt-6'>Anggota Kelompok</p>
                        <table className='mt-2 table table-auto w-full border-collapse border border-slate-500'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Nik</th>
                                    <th>Pendidikan</th>
                                    <th>Alamat</th>
                                    <th>No Hp</th>
                                    <th>Keterangan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.filter((e) => e.type === 'anggota').map((e, i) => (
                                    <tr key={i}  >
                                        <td>{i + 1}</td>
                                        <td>{e.name}</td>
                                        <td>{e.nik}</td>
                                        <td>{e.pendidikan}</td>
                                        <td>{e.address}</td>
                                        <td>{e.phone}</td>
                                        <td>{e.description}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('member.show', e.id)}
                                                className='btn bg-yellow-500'>
                                                Detail
                                            </InertiaLink>
                                            <InertiaLink
                                                href={route('member.edit', e.id)}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                            <button
                                                onClick={(r) => {
                                                    r.preventDefault()
                                                    if (confirm("Yakin ingin mengahpus data?")) {
                                                        setShowAlert(true)
                                                        Inertia.delete(route('member.destroy', e.id));
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
