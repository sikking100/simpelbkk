import { PagesProps } from '@/Inteface/Global';
import { TypeOfAction } from '@/Inteface/TypeOfAction';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    typeOfAction: TypeOfAction
}

export default function Create({ auth, errors, typeOfAction }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Tipe Kegiatan'}
        >
            <Head title='Ubah Tipe Kegiatan' />
            <Form
                typeOfAction={typeOfAction} />
        </Authenticated>
    )
}
