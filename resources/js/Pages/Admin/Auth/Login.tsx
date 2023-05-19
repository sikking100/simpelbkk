import Input from "@/Component/Input"
import Label from "@/Component/Label"
import Guest from "@/Layouts/Guest"
import { Head, useForm } from "@inertiajs/inertia-react"
import ReCAPTCHA from 'react-google-recaptcha'
import React from "react"
import route from 'ziggy-js'
import { ErrorText } from "@/Component/Error"
import { Banner } from "@/Inteface/Banner"

interface Props {
    siteKey: string
    banner: Banner
}

interface FormProps {
    username: string
    password: string
    captcha: string
}

export default function Login({ siteKey, banner }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormProps>({
        username: '',
        password: '',
        captcha: '',
    })



    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        type keys = keyof FormProps
        setData(e.target.name as keys, e.target.value)
        return
    }

    function onSubmit(e: React.FormEvent): React.FormEventHandler<HTMLFormElement> | undefined {
        e.preventDefault()
        post(route('login'))
        return
    }

    return (
        <div className="min-h-screen max-h-full flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-mint overflow-y-scroll">
            <div className={'text-white w-full flex flex-col place-items-center'}>
                <img src="../assets/logo.png" alt="" className={'h-40 mb-2'} />
                <div className='text-navy flex flex-col items-center'>
                    <p className={'text-2xl mx-auto'}>Login Dashboard</p>
                    <p className="text-xl">SIMPEL - BKK</p>
                    <p className="text-lg mx-auto text-center">Dinas Pemberdayaan Masyarakat dan Desa Daerah</p>
                    <p className="text-lg">Kabupaten Morowali Utara</p>
                    <p>versi 1.0</p>
                </div>
            </div>
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-teal shadow-md overflow-hidden sm:rounded-lg">
                <Head title="Log in" />

                <form onSubmit={onSubmit} className={"flex flex-col"}>
                    <Label
                        value="Username"
                    />
                    <Input
                        type={"text"}
                        className={"w-full"}
                        onChange={onChange}
                        name={'username'}
                        value={data.username}
                    />
                    <Label
                        value="Password" />
                    <Input
                        name={'password'}
                        value={data.password}
                        type={"password"}
                        className={"w-full"}
                        onChange={onChange}
                    />
                    <div className="block mt-4">
                        <ReCAPTCHA
                            className={'flex items-center justify-center'}
                            sitekey={siteKey}

                            onChange={(e) => {
                                if (e !== null) {
                                    setData('captcha', e)
                                }
                            }}
                        >
                        </ReCAPTCHA>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <input
                            type={"submit"}
                            value={"Login"}
                            className={"btn self-center bg-black"}
                        />
                    </div>
                </form>
            </div>

            {Object.keys(errors).length > 0 && Object.values(errors).map((e, i) => <ErrorText key={i} message={e} />)}
        </div>

    )
}
