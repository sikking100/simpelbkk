import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import DistrictForm from './Form';

interface Props extends PagesProps {
    district: District
}

export default function Create({ auth, errors, district }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Buat Desa'}
        >
            <Head title='Buat Desa' />
            <DistrictForm
                district={district}
            />
        </Authenticated>
    )
}
