import Input from "@/Component/Input"
import Label from "@/Component/Label"
import Guest from "@/Layouts/Guest"
import { useForm } from "@inertiajs/inertia-react"
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
        <Guest
            banner={banner}>
            <div className="min-h-screen flex flex-col justify-center items-center mt-10">
                <img src="../assets/logo.png" alt="" className={'h-40 mb-2'} />
                <p className={'text-2xl'}>Login Dashboard</p>
                <p className="text-xl">SIMPEL - BKK</p>
                <p className="text-lg">Dinas Pemberdayaan Masyarakat dan Desa Daerah</p>
                <p className="text-lg">Kabupaten Morowali Utara</p>
                <form onSubmit={onSubmit} className={"my-16 flex flex-col"}>
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
                    <ReCAPTCHA
                        className={'my-6'}
                        sitekey={siteKey}

                        onChange={(e) => {
                            if (e !== null) {
                                setData('captcha', e)
                            }
                        }}
                    >
                    </ReCAPTCHA>
                    <input
                        type={"submit"}
                        value={"Login"}
                        className={"btn self-center"}
                    />
                </form>
                {Object.keys(errors).length > 0 && Object.values(errors).map((e, i) => <ErrorText key={i} message={e} />)}
            </div>
        </Guest>
    )
}
