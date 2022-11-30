import { Category } from '@/Inteface/Category';
import { PagesProps } from '@/Inteface/Global';
import { TypeOfAction } from '@/Inteface/TypeOfAction';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    categories: Array<Category>
    types: Array<TypeOfAction>
}

export default function Create({ auth, errors, categories, types }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Buat Kelompok'}
        >
            <Head title='Buat Kelompok' />
            <Form
                group={null}
                categories={categories}
                types={types}
            />
        </Authenticated>
    )
}
