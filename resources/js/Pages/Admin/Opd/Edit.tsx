import { PagesProps } from '@/Inteface/Global';
import { Opd } from '@/Inteface/Opd';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    opd: Opd
}

export default function Create({ auth, errors, opd }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Opd Teknis'}
        >
            <Head title='Ubah Opd Teknis' />
            <Form
                opd={opd} />
        </Authenticated>
    )
}
