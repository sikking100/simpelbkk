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
            header={'Buat Video'}
        >
            <Head title='Buat Video' />
            <Form />
        </Authenticated>
    )
}
