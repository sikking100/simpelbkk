import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import { Village } from '@/Inteface/Village';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import DistrictForm from './Form';

interface Props extends PagesProps {
    district: District
    village: Village
}

export default function Create({ auth, errors, district, village }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Desa'}
        >
            <Head title='Ubah Desa' />
            <DistrictForm
                district={district}
                village={village}
            />
        </Authenticated>
    )
}
