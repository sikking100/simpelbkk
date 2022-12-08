import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { Announcement } from "@/Inteface/Announcement";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import ReactDatePicker from "react-datepicker";
import route from "ziggy-js";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { dateToMysql, dateToShow } from "@/Function/function";


interface Props {
    announcement?: Announcement | undefined
}

interface FormProps {
    begin: string
    end: string
    location: string
    type: string
    participant: string
}

export default function Form({ announcement }: Props) {
    const { data, setData, post, put, errors } = useForm<FormProps>({
        begin: announcement?.begin ?? dateToMysql(Date.prototype),
        end: announcement?.end ?? dateToMysql(Date.prototype),
        type: announcement?.type ?? '',
        participant: announcement?.participant ?? '',
        location: announcement?.location ?? ''
    })

    type keys = keyof FormProps

    const title = announcement === undefined ? 'Simpan' : 'Ubah'
    return (
        <form className="w-full p-6" onSubmit={(e) => {
            e.preventDefault()
            if (announcement === undefined) {
                post(route('announcement.store'))
                return
            }
            put(route('announcement.update', announcement.id))
        }}>
            <BackButton
                router={'announcement'}
            />
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label htmlFor="begin" className="form-label">
                        Dari Tanggal
                    </label>
                    <ReactDatePicker
                        className="form-input"
                        value={dateToShow(Date.parse(data.begin))}
                        onChange={(e) => {
                            if (e !== null) {
                                setData('begin', moment(e).format('YYYY-MM-DD HH:mm:ss'))
                            }
                        }}
                    />
                </div>
                <div className="w-full px-3">
                    <label htmlFor="end" className="form-label">
                        S/D Tanggal
                    </label>
                    <ReactDatePicker
                        className="form-input"
                        value={dateToShow(Date.parse(data.end))}
                        onChange={(e) => {
                            if (e !== null) {
                                setData('end', moment(e).format('YYYY-MM-DD HH:mm:ss'))
                            }
                        }}
                    />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Lokasi
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        name="location"
                        onChange={(e) => setData(e.target.name as keys, e.target.value)}

                    />
                    <ErrorText message={errors.location} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Jenis Kegiatan
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        name="type"
                        onChange={(e) => setData(e.target.name as keys, e.target.value)}

                    />
                    <ErrorText message={errors.type} />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Peserta
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        name="participant"
                        onChange={(e) => setData(e.target.name as keys, e.target.value)}

                    />
                    <ErrorText message={errors.participant} />
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
