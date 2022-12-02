import { Category } from '@/Inteface/Category';
import { PagesProps } from '@/Inteface/Global';
import { Group } from '@/Inteface/Group';
import { TypeOfAction } from '@/Inteface/TypeOfAction';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    group: Group
}

export default function Create({ auth, errors, group }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={`Buat Anggota Kelompok ${group.name}`}
        >
            <Head title='Buat Anggota' />
            <Form
                group={group}
            />
        </Authenticated>
    )
}
