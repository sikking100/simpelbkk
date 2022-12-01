import { District } from "@/Inteface/District";
import { PagesProps } from "@/Inteface/Global";
import { Group } from "@/Inteface/Group";
import { Village } from "@/Inteface/Village";
import Authenticated from "@/Layouts/Authenticated";
import { InertiaLink } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import route from "ziggy-js";

interface Props extends PagesProps {
    districts: Array<District>
}

export default function Kabupatend({ districts, auth, errors }: Props) {
    const [kecamatan, setKecamatan] = useState<number>()
    const [pickedDesa, setPickedDesa] = useState<number>(0)
    const [desa, setDesa] = useState<Array<Village>>([])
    const [data, setData] = useState<Array<Group>>([])
    const getDesa = () => axios.get(`/kabupaten/${kecamatan}/desa`).then((e) => setDesa(e.data)).catch((e) => console.log(e));
    const getData = () => axios.get(`/kabupaten/${pickedDesa}/data`).then((e) => setData(e.data)).catch((er) => console.log(er));

    useEffect(() => {
        if (kecamatan !== 0) {
            getDesa()
            if (pickedDesa !== 0) {
                getData()
            } else {
                setData([])
            }
        } else {
            setData([])
            setDesa([])
            setPickedDesa(0)
        }


        return
    }, [kecamatan, pickedDesa])


    return (
        <Authenticated
            auth={auth}
            errors={errors}
        >
            <div className="gap-6 flex">
                <select name="kecamatan" id="" onChange={(e) => {
                    if (e.target.value !== null) {

                        setKecamatan(Number.parseInt(e.target.value))
                    }
                }}>
                    <option value="0">-- Pilih Kecamatan --</option>
                    {districts && districts.map((e, i) => <option value={e.id} key={i}>{e.name}</option>)}
                </select>
                <select name="pickedDesa" id="" onChange={(e) => {
                    if (e.target.value !== null) {
                        setPickedDesa(Number.parseInt(e.target.value))
                    }
                }}>
                    <option value="0">-- Pilih Desa --</option>
                    {desa && desa.map((e, i) => <option value={e.id} key={i}>{e.name}</option>)}
                </select>
            </div>
            <div className="mt-6 grid grid-cols-3">
                {data.length === 0 ? 'Data kosong' : data.map((e, i) => (
                    <div key={i} className='max-w-fit border-2 border-black rounded-lg'>
                        <img src={`../../../storage/groups/${e.image}`} alt="" className='w-full rounded-t-lg' />
                        <hr className="min-w-full border-b-1 border-black" />
                        <div className='flex flex-col p-6 gap-2'>
                            <p>{e.name}</p>
                            <p>{e.profil}</p>

                        </div>
                    </div>
                ))}
            </div>

        </Authenticated>
    )

}