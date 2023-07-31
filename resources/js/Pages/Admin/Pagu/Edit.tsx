import { PagesProps } from "@/Inteface/Global"
import { Pagu } from "@/Inteface/Pagu"
import Authenticated from "@/Layouts/Authenticated"
import { Head } from "@inertiajs/inertia-react"
import React from "react"
import Form from "./Form"

interface Props extends PagesProps {
    pagu: Pagu
}

export default function Create({ auth, errors, pagu }: Props) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Ubah Opd Teknis'}
        >
            <Head title='Ubah Opd Teknis' />
            <Form
                pagu={pagu} />
        </Authenticated>
    )
}
