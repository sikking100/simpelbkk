import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { Category } from "@/Inteface/Category";
import { defImage } from "@/Inteface/DefImage";
import { Group } from "@/Inteface/Group";
import { TypeOfAction } from "@/Inteface/TypeOfAction";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { dateToMysql, dateToShow } from "@/Function/function";
import { Member } from "@/Inteface/Member";
import { Inertia } from "@inertiajs/inertia";
import { pendidikan } from "@/Inteface/Global";

interface Props {
    group?: Group
    member?: Member
}

interface FormProps {
    group_id: number
    type: string
    nik: string
    pendidikan: string
    address: string
    phone: string
    description: string
    image: File | null
    name: string

}

export default function Form({ group, member }: Props) {
    type keys = keyof FormProps

    const { data, setData, post, put, errors } = useForm<FormProps>({
        group_id: member?.group_id ?? group?.id ?? 0,
        type: member?.type ?? 'anggota',
        nik: member?.nik ?? '',
        pendidikan: member?.pendidikan ?? '',
        address: member?.address ?? '',
        phone: member?.phone ?? '',
        description: member?.description ?? '',
        image: null,
        name: member?.name ?? ''
    })

    const title = member === undefined ? 'Simpan' : 'Ubah'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keys, e.target.value)
    }

    const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
    const [preview, setPreview] = React.useState<string>()
    React.useEffect(() => {
        if (!selectedFile) {
            if (member !== undefined) {
                setPreview(`../../../../storage/members/${member?.image}`)
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
            if (member === undefined) {
                post(route('member.store'))
                return
            }
            Inertia.post(route('member.update', member?.id), {
                '_method': 'PUT',
                'group_id': data.group_id,
                'type': data.type,
                'nik': data.nik,
                'pendidikan': data.pendidikan,
                'address': data.address,
                'phone': data.phone,
                'description': data.description,
                'image': data.image,
                'name': data.name
            })
            return
        }}>
            <BackButton
                router={'member'}
                id={group?.id}
            />
            <div className="grid grid-rows-6 grid-flow-col -mx-3 mb-2">
                <div className="row-span-4">
                    <label className="form-label">
                        Upload KTP
                    </label>
                    <img src={preview} className="h-2/3 mb-6" />
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'file'}
                        name={'image'}
                        onChange={onSelectFile}
                    />
                    <ErrorText message={errors.image} />
                </div>
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Keterangan
                    </label>
                    <textarea
                        className="form-input"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    >
                    </textarea>
                    <ErrorText message={errors.description} />
                </div>
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Alamat
                    </label>
                    <textarea
                        className="form-input"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    >
                    </textarea>
                    <ErrorText message={errors.address} />
                </div>

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nik
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.nik}
                        name={'nik'}
                        onChange={handleChange}
                    />
                    <ErrorText message={errors.nik} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nama
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.name}
                        name={'name'}
                        onChange={handleChange}
                    />
                    <ErrorText message={errors.name} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Pendidikan
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.pendidikan}
                        onChange={(e) => setData('pendidikan', e.target.value)}
                    >
                        <option value={''}>-- Pilih Kategori --</option>
                        {pendidikan.map((e, i) => (<option value={e} key={i}>e</option>))}
                    </select>
                    <ErrorText message={errors.pendidikan} />
                </div>

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        No Hp
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.phone}
                        name={'phone'}
                        onChange={handleChange}
                    />
                    <ErrorText message={errors.phone} />
                </div>


            </div>
            <div className="w-full pb-6 px-3 inline-flex gap-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Ketua Kelompok
                </label>
                <input
                    type={'checkbox'}
                    checked={data.type == 'ketua'}
                    name={'type'}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setData('type', 'ketua')
                        } else {
                            setData('type', 'anggota')
                        }

                    }}
                />
                <ErrorText message={errors.type} />
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
