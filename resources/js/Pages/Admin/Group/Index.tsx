import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { Group } from '@/Inteface/Group'
import Authenticated from '@/Layouts/Authenticated'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

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
                                        <InertiaLink
                                            href={route('group.edit', e.id)}
                                            className='btn bg-blue-600'
                                        >Edit
                                        </InertiaLink>
                                        <InertiaLink
                                            href={route('group.show', e.id)}
                                            className='btn bg-yellow-600'
                                        >Detail
                                        </InertiaLink>
                                        <InertiaLink
                                            href={route('member.index', e.id)}
                                            className='btn bg-green-600'
                                        >Anggota
                                        </InertiaLink>
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
