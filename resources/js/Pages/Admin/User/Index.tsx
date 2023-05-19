import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { User } from '@/Inteface/User'
import Authenticated from '@/Layouts/Authenticated'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    users: Array<User>
}

export default function Index({ auth, errors, users, flash }: Props) {
    const [showAlert, setShowAlert] = React.useState(true);
    const [showPass, setShowPass] = React.useState(false);

    React.useEffect(() => {
        console.log('initialize interval')
        if (showAlert == false) {
            setShowAlert(true)
        }

        if (showPass == false) {
            setShowPass(true)
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
            header={'User'}
        >
            <Head
                title='User'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <Alert
                showAlert={showPass}
                setShowAlert={setShowPass}
                message={flash?.password ?? ''}
            />
            <InertiaLink
                href={route('user.create')}
                className='btn'
            >
                Tambah User
            </InertiaLink>
            <div
                className='mt-6'
            >
                {users.length === 0 ? (
                    <div>
                        <p>User Kosong</p>
                    </div>
                ) : (
                    <div className='w-full overflow-auto'>
                        <table className='table table-auto w-full border-collapse border border-slate-500'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>Nama</th>
                                    <th>Kecamatan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((e, i) => (
                                    <tr key={i}  >
                                        <td>{i + 1}</td>
                                        <td>{e.username}</td>
                                        <td>{e.village_name ?? '-'}</td>
                                        <td>{e.district_name ?? '-'}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('user.edit', e.id)}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                            <InertiaLink
                                                href={route('user.show', e.id)}
                                                className='btn bg-red-500'>
                                                Reset Password
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
