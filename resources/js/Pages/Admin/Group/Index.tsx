import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { Group } from '@/Inteface/Group'
import Authenticated from '@/Layouts/Authenticated'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'
import { Tooltip } from "flowbite-react";
import { Inertia } from '@inertiajs/inertia'

interface Props extends PagesProps {
    groups: Array<Group>
}

export default function Index({ auth, errors, groups, flash }: Props) {
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
            header={'Kelompok'}
        >
            <Head
                title='Kelompok'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('group.create')}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                {groups.length === 0 ? (
                    <div>
                        <p>Data Kosong</p>
                    </div>
                ) : (
                    <div className='flex flex-row gap-2 flex-wrap'>
                        {groups.map((e, i) => (
                            <div key={i} className='border-2 border-black rounded-lg'>
                                <img src={`../../../storage/groups/${e.image}`} alt="" className='object-cover rounded-t-lg md:h-32 md:w-full' />
                                <hr className="border-b-1 border-black" />
                                <div className='p-2'>
                                    <p>{e.name}</p>
                                    <div className='pt-2 gap-1 flex flex-col md:flex-row'>
                                        <Tooltip
                                            content='Edit'
                                            arrow={false}
                                        >

                                            <InertiaLink
                                                data-tooltip-id='mytooltip'
                                                href={route('group.edit', e.id)}
                                                className='btn bg-blue-600'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil inline-block" viewBox="0 0 16 16">
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                </svg>
                                            </InertiaLink>
                                        </Tooltip>
                                        <Tooltip
                                            content='Detail'
                                            arrow={false}

                                        >
                                            <InertiaLink
                                                href={route('group.show', e.id)}
                                                className='btn bg-yellow-600'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-lg inline-block" viewBox="0 0 16 16"> <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" /> </svg>
                                            </InertiaLink>
                                        </Tooltip>
                                        <Tooltip
                                            content='Anggota'
                                            arrow={false}

                                        >
                                            <InertiaLink
                                                href={route('member.index', e.id)}
                                                className='btn bg-green-600'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people inline-block" viewBox="0 0 16 16"> <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /> </svg>
                                            </InertiaLink>
                                        </Tooltip>
                                        <Tooltip
                                            content='Hapus'
                                            arrow={false}

                                        >
                                            <InertiaLink
                                                href='#'
                                                className='btn bg-red-600'
                                                onClick={(r) => {
                                                    r.preventDefault()
                                                    if (confirm("Yakin ingin mengahpus data?")) {
                                                        setShowAlert(true)
                                                        Inertia.delete(route('group.destroy', e.id));
                                                    }
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash inline-block" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /> </svg>
                                            </InertiaLink>
                                            {/* <button
                                                onClick={(r) => {
                                                    r.preventDefault()
                                                    if (confirm("Yakin ingin mengahpus data?")) {
                                                        setShowAlert(true)
                                                        Inertia.delete(route('member.destroy', e.id));
                                                    }
                                                }}
                                                className={'btn bg-red-700'}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash inline-block" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /> </svg>
                                            </button> */}
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>

                        )
                        )
                        }
                    </div>
                )}
            </div>

        </Authenticated>
    )
}
