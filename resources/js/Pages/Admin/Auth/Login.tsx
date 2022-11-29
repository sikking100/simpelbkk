import Guest from "@/Layouts/Guest"
import { useForm } from "@inertiajs/inertia-react"
import React from "react"


interface FormProps {
    username: string
    password: string
    captcha: string
}

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<FormProps>()

    return (
        <Guest>
            <div className="w-full min-h-screen flex flex-col sm:justify-center items-center">
                <img src="../assets/logo.png" alt="" className={'h-40 mb-2'} />
                <p className={'text-2xl'}>Login Dashboard</p>
                <p className="text-xl">SIMPEL - BKK</p>
                <p className="text-lg">Dinas Pemberdayaan Masyarakat dan Desa Daerah</p>
                <p className="text-lg">Kabupaten Morowali Utara</p>

            </div>
        </Guest>
    )
}