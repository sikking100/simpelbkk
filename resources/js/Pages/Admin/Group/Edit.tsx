import { Category } from '@/Inteface/Category';
import { District } from '@/Inteface/District';
import { PagesProps } from '@/Inteface/Global';
import { Group } from '@/Inteface/Group';
import { Opd } from '@/Inteface/Opd';
import { TypeOfAction } from '@/Inteface/TypeOfAction';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    categories: Array<Category>
    types: Array<TypeOfAction>
    group: Group
    opdes: Array<Opd>

}

export default function Create({ auth, errors, group, categories, opdes, types }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Kecamatan'}
        >
            <Head title='Ubah Kecamatan' />
            <Form
                categories={categories}
                types={types}
                group={group}
                opdes={opdes}
            />
        </Authenticated>
    )
}
