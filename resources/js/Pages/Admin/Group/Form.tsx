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
import { Inertia } from "@inertiajs/inertia";
import { Opd } from "@/Inteface/Opd";

interface Props {
    categories: Array<Category>
    types: Array<TypeOfAction>
    group?: Group | null
    opdes: Array<Opd>
}

interface FormProps {
    image: File | null
    name: string
    category_id: number
    type_of_action_id: number
    profil: string
    address: string
    description: string
    npwp: string
    phone: string
    date: string
    email: string
    proposal: File | null
    opd_id: number

}

export default function Form({ group, categories, opdes, types }: Props) {
    type keys = keyof FormProps

    const { data, setData, post, put, errors } = useForm<FormProps>({
        image: null,
        name: group?.name ?? '',
        category_id: group?.category_id ?? 0,
        type_of_action_id: group?.type_of_action_id ?? 0,
        profil: group?.profil ?? '',
        address: group?.address ?? '',
        description: group?.description ?? '',
        npwp: group?.npwp ?? '',
        phone: group?.phone ?? '',
        date: group?.date ?? dateToMysql(Date.prototype),
        email: group?.email ?? '',
        proposal: null,
        opd_id: group?.opd_id ?? 0,
    })

    const title = group === null ? 'Simpan' : 'Ubah'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keys, e.target.value)
    }

    const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource>()
    const [preview, setPreview] = React.useState<string>()
    React.useEffect(() => {
        if (!selectedFile) {
            if (group !== null) {
                setPreview(`../../../../storage/groups/${group?.image}`)
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
            if (group === null) {
                post(route('group.store'))
                return
            }
            Inertia.post(route('group.update', group?.id), {
                '_method': 'PUT',
                'image': data.image,
                'name': data.name,
                'category_id': data.category_id,
                'type_of_action_id': data.type_of_action_id,
                'profil': data.profil,
                'address': data.address,
                'description': data.description,
                'npwp': data.npwp,
                'phone': data.phone,
                'date': data.date,
                'email': data.email,
                'proposal': data.proposal,
                'opd_id': data.opd_id,
            })
            return
        }}>
            <BackButton
                router={'group'}
            />
            {Object.values(errors).map(e => (<p>{e}</p>))}
            <div className="grid grid-rows-4 grid-flow-col -mx-3 mb-2">
                <div className="row-span-3">
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
                        Profil
                    </label>
                    <textarea
                        className="form-input"
                        value={data.profil}
                        onChange={(e) => setData('profil', e.target.value)}
                    >
                    </textarea>
                    <ErrorText message={errors.category_id} />
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
                        Kategori Kelompok
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.category_id}
                        name={'category_id'}
                        onChange={(e) => setData('category_id', Number.parseInt(e.target.value))}
                    >
                        <option value={0}>-- Pilih Kategori --</option>
                        {categories.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                    </select>
                    <ErrorText message={errors.category_id} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Jenis Kegiatan
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.type_of_action_id}
                        name={'type_of_action_id'}
                        onChange={(e) => setData('type_of_action_id', Number.parseInt(e.target.value))}
                    >
                        <option value={0}>-- Pilih Jenis Kegiatan --</option>
                        {types.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                    </select>
                    <ErrorText message={errors.type_of_action_id} />
                </div>

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Alamat
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.address}
                        name={'address'}
                        onChange={handleChange}
                    />
                    <ErrorText message={errors.address} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Keterangan Usaha
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.description}
                        name={'description'}
                        onChange={handleChange}
                    />
                    <ErrorText message={errors.description} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Npwp Ketua
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.npwp}
                        name={'npwp'}
                        onChange={handleChange}
                    />
                    <ErrorText message={errors.npwp} />
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

                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Proposal
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'file'}
                        name={'proposal'}
                        onChange={(e) => {
                            if (e.target.files !== null) {
                                setData('proposal', e.target.files[0])
                            }
                        }}
                    />
                    <ErrorText message={errors.proposal} />
                </div>
                <div className="w-full px-3">
                    <label className={'form-label'}>
                        Tanggal
                    </label>
                    <DatePicker
                        value={dateToShow(Date.parse(data.date))}
                        className={'form-input'}
                        onChange={(e) => {
                            if (e !== null) {
                                setData('date', dateToMysql(e))
                            }
                        }}
                    />
                    <ErrorText message={errors.date} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Opd Teknis
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.opd_id}
                        name={'opd_id'}
                        onChange={(e) => setData('opd_id', Number.parseInt(e.target.value))}
                    >
                        <option value={0}>-- Pilih Opd Teknis --</option>
                        {opdes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                    </select>
                    <ErrorText message={errors.opd_id} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email (opsional)
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.email}
                        name={'email'}
                        onChange={handleChange}
                    />
                    <ErrorText message={errors.email} />
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
