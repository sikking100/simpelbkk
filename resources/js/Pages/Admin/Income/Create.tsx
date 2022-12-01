import { Category } from '@/Inteface/Category';
import { PagesProps } from '@/Inteface/Global';
import { Group } from '@/Inteface/Group';
import { TypeOfAction } from '@/Inteface/TypeOfAction';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    groups: Array<Group>
}

export default function Create({ auth, errors, groups }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Buat Laporan Pendapatan'}
        >
            <Head title='Buat Laporan Pendapatan' />
            <Form
                groups={groups}
            />
        </Authenticated>
    )
}
