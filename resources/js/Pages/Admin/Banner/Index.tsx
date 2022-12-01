import Alert from '@/Component/Alert'
import Input from '@/Component/Input'
import { Banner } from '@/Inteface/Banner'
import { defImage } from '@/Inteface/DefImage'
import { PagesProps } from '@/Inteface/Global'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    banner?: Banner
}

interface FormProps {
    image: File | null
}

export default function Index({ auth, errors, banner, flash }: Props) {
    const [showAlert, setShowAlert] = React.useState(true);
    const { data, setData, post } = useForm<FormProps>({
        image: null
    })

    React.useEffect(() => {
        console.log('initialize interval')
        if (showAlert == false) {
            setShowAlert(true)
        }
        const interval = setInterval(() => {
            if (showAlert == true) {
                setShowAlert(false)
            }
            return
        }, 8000)
        return () => {
            console.log('clearing interval')
            clearInterval(interval)
        }
    }, [])

    const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
    const [preview, setPreview] = React.useState<string>()

    React.useEffect(() => {
        if (!selectedFile) {
            if (banner !== null) {
                setPreview(`../../../../storage/banner/${banner?.image}`)
                return
            }
            setPreview(defImage)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        const file = e.target.files[0]
        setSelectedFile(file)

        setData('image', file)
    }

    const title = banner === null ? 'Simpan' : 'Ubah'

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Banner'}
        >
            <Head
                title='Banner'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <div
                className='mt-6'
            >
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (banner === null) {
                        post(route('banner.store'))
                    } else {
                        Inertia.post(route('banner.update', banner?.id), {
                            'image': data.image,
                            '_method': 'PUT',
                        })
                    }
                }}>
                    <img className='mb-6' src={preview} alt="" />
                    <Input
                        className='form-input'
                        type={'file'}
                        name={'image'}
                        onChange={onSelectFile}
                    />
                    <input type="submit" value={title} className={'btn'} />
                </form>
            </div>

        </Authenticated>
    )
}
