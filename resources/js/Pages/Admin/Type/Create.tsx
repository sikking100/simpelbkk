import { PagesProps } from '@/Inteface/Global';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

export default function Create({ auth, errors }: PagesProps) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Buat Tipe Kegiatan'}
        >
            <Head title='Buat Tipe Kegiatan' />
            <Form />
        </Authenticated>
    )
}
