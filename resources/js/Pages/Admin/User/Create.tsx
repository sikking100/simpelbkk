import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    districts: Array<District>
}

export default function Create({ auth, errors, districts }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Buat User'}
        >
            <Head title='Buat User' />
            <Form
                districts={districts}
            />
        </Authenticated>
    )
}
