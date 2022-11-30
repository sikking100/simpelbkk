import { PagesProps } from '@/Inteface/Global';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import DistrictForm from './Form';

interface Props extends PagesProps {
    id: number
}

export default function Create({ auth, errors, id }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Buat Desa'}
        >
            <Head title='Buat Desa' />
            <DistrictForm
                id={id}
            />
        </Authenticated>
    )
}