import { Announcement } from '@/Inteface/Announcement';
import { PagesProps } from '@/Inteface/Global';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    announcement: Announcement
}

export default function Create({ auth, errors, announcement }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Pengumuman'}
        >
            <Head title='Ubah Pengumuman' />
            <Form
                announcement={announcement} />
        </Authenticated>
    )
}
