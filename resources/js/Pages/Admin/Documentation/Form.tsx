import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { Group } from "@/Inteface/Group";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { Documentation } from "@/Inteface/Documentation";
import { defImage } from "@/Inteface/DefImage";

interface Props {
    groups: Array<Group>
    documentation?: Documentation
}

interface FormProps {
    group_id: number
    progress: string
    description: string
    image: File | null
}

export default function Form({ groups, documentation }: Props) {
    type keys = keyof FormProps

    const { data, setData, post, put, errors } = useForm<FormProps>({
        group_id: documentation?.group_id ?? 0,
        progress: documentation?.progress ?? '',
        image: null,
        description: documentation?.description ?? ''
    })

    const title = documentation === undefined ? 'Simpan' : 'Ubah'


    const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
    const [preview, setPreview] = React.useState<string>()
    React.useEffect(() => {
        if (!selectedFile) {
            if (documentation !== undefined) {
                setPreview(`../../../../storage/groups/${documentation?.image}`)
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


    return (
        <form className="w-full p-6" onSubmit={(e) => {
            e.preventDefault()
            if (documentation === undefined) {
                post(route('documentation.store'))
                return
            }
            put(route('documentation.update', documentation?.id))
        }}>
            <BackButton
                router={'documentation'}
            />
            <div className="-mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Kelompok
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.group_id}
                        name={'group_id'}
                        onChange={(e) => setData('group_id', Number.parseInt(e.target.value))}
                    >
                        <option value={0}>-- Pilih Kelompok --</option>
                        {groups.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                    </select>
                    <ErrorText message={errors.group_id} />
                </div>
                <div className="w-full px-3">
                    <label className={'form-label'}>
                        Progress
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.progress}
                        name={'progress'}
                        onChange={(e) => setData('progress', e.target.value)}
                    >
                        <option value={0}>-- Pilih Kategori --</option>
                        <option value={'25%'}>25%</option>
                        <option value={'50%'}>50%</option>
                        <option value={'75%'}>75%</option>
                        <option value={'100%'}>100%</option>
                    </select>
                    <ErrorText message={errors.progress} />
                </div>
                <div className="w-full px-3">
                    <img src={preview} className="h-2/3 mb-6" />
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'file'}
                        name={'image'}
                        onChange={onSelectFile}
                    />
                    <ErrorText message={errors.image} />
                </div>

                <div className="w-full px-3">
                    <label className="form-label">
                        Keterangan Dokumentasi
                    </label>
                    <textarea
                        className="form-input"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    >
                    </textarea>
                    <ErrorText message={errors.description} />
                </div>
            </div>

            <div className="md:flex md:items-center">
                <button
                    className="shadow bg-nav hover:bg-nav-hover focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    {title}
                </button>
            </div>
        </form>
    )
}
