import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { Group } from '@/Inteface/Group'
import { Member } from '@/Inteface/Member'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'
import { Tooltip } from 'flowbite-react'

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
                        <div className='inline-flex'>
                            <p className='pr-2'>Ketua Kelompok</p>
                            <Tooltip

                                content='Ubah data ketua'
                                arrow={false}
                            >
                                <InertiaLink
                                    href={route('member.edit', chief?.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-pencil" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
                                </InertiaLink>
                            </Tooltip>
                            <div id="tooltip-animation" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Tooltip content
                            </div>
                        </div>
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
