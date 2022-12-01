import { Category } from '@/Inteface/Category';
import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import { Group } from '@/Inteface/Group';
import { Realization } from '@/Inteface/Realization';
import { TypeOfAction } from '@/Inteface/TypeOfAction';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    groups: Array<Group>
    realization: Realization
}

export default function Create({ auth, errors, groups, realization }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Laporan Realisasi'}
        >
            <Head title='Ubah Laporan Realisasi' />
            <Form
                groups={groups}
                realization={realization}
            />
        </Authenticated>
    )
}
