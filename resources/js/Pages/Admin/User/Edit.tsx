import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import { User } from '@/Inteface/User';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    user: User
    districts: Array<District>

}

export default function Create({ auth, errors, user, districts }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah User'}
        >
            <Head title='Ubah User' />
            <Form
                districts={districts}
                user={user}
            />
        </Authenticated>
    )
}
