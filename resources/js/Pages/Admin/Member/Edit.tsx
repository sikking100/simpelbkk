import { Category } from '@/Inteface/Category';
import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import { Group } from '@/Inteface/Group';
import { Member } from '@/Inteface/Member';
import { TypeOfAction } from '@/Inteface/TypeOfAction';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    member: Member
}

export default function Create({ auth, errors, member }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Data Anggota'}
        >
            <Head title='Ubah Data Anggota' />
            <Form
                member={member}
            />
        </Authenticated>
    )
}
