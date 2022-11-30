import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { District } from "@/Inteface/District";
import { User } from "@/Inteface/User";
import { Village } from "@/Inteface/Village";
import { useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import route from "ziggy-js";

interface Props {
    districts: Array<District>
    user?: User | undefined
}

interface FormProps {
    username: string
    district_id: number
    village_id: number
}

export default function Form({ user, districts }: Props) {
    const { data, setData, post, put, errors } = useForm<FormProps>({
        username: user?.username ?? '',
        district_id: user?.district_id ?? 0,
        village_id: user?.village_id ?? 0
    })

    const [villages, setVillage] = useState<Array<Village>>([])

    useEffect(() => {
        if (user !== undefined || user !== null) {
            getVillages(user?.district_id ?? 0)
        }
        console.log('terpanggil');

        return () => {

        }
    }, [])


    function getVillages(id: number) {
        axios.get(`/district/${id}/villages`).then(res => {
            const v = res.data.villages as Array<Village>
            setVillage(v)
        }).catch(e => console.log(e))
        return
    }

    const title = user === undefined ? 'Simpan' : 'Ubah'
    return (
        <form className="w-full p-6" onSubmit={(e) => {
            e.preventDefault()
            if (user === undefined) {
                post(route('user.store'))
                return
            }
            put(route('user.update', user.id))
        }}>
            <BackButton
                router={'user'}
            />
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nama Pengguna
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                    />
                    <ErrorText message={errors.username} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Kecamatan
                    </label>
                    <select name="district_id"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.district_id}
                        onChange={(e) => {
                            if (e.target.value === '0') {
                                setVillage([])
                            }
                            const value: number = Number.parseInt(e.target.value)
                            setData('district_id', value)
                            getVillages(value)
                        }}
                    >
                        <option value={0}>-- Pilih Kecamatan --</option>
                        {districts.map((e, i) => (<option value={e.id} key={i}>{e.name}</option>))}
                    </select>
                    <ErrorText message={errors.username} />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Desa
                    </label>
                    <select name="village_id"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.village_id}
                        onChange={(e) => {
                            if (e.target.value === '') return
                            setData('village_id', Number.parseInt(e.target.value))
                        }}
                    >
                        <option value={0}>-- Pilih Desa --</option>
                        {villages.map((e, i) => (<option value={e.id} key={i}>{e.name}</option>))}
                    </select>
                    <ErrorText message={errors.username} />
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
