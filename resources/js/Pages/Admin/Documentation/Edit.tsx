import { PagesProps } from '@/Inteface/Global';
import { Group } from '@/Inteface/Group';
import { Income } from '@/Inteface/Income';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    groups: Array<Group>
    income: Income
}

export default function Create({ auth, errors, groups, income }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Laporan Pendapatan'}
        >
            <Head title='Ubah Laporan Pendapatan' />
            <Form
                groups={groups}
                income={income}
            />
        </Authenticated>
    )
}
