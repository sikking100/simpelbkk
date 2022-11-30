import { Category } from '@/Inteface/Category';
import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    category: Category
}

export default function Create({ auth, errors, category }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Kategori'}
        >
            <Head title='Ubah Kategori' />
            <Form
                category={category} />
        </Authenticated>
    )
}
