import { PagesProps } from '@/Inteface/Global';
import { Video } from '@/Inteface/Video';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react'
import Form from './Form';

interface Props extends PagesProps {
    video: Video
}

export default function Create({ auth, errors, video }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Video'}
        >
            <Head title='Ubah Video' />
            <Form
                video={video} />
        </Authenticated>
    )
}
