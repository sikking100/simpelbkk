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
    date: string
    description: string
}

export default function Form({ announcement }: Props) {
    const { data, setData, post, put, errors } = useForm<FormProps>({
        date: announcement?.date ?? dateToMysql(Date.prototype),
        description: announcement?.description ?? ''
    })

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
                    <label htmlFor="date" className="form-label">
                        Tanggal
                    </label>
                    <ReactDatePicker
                        className="form-input"
                        value={dateToShow(Date.parse(data.date))}
                        onChange={(e) => {
                            if (e !== null) {
                                setData('date', moment(e).format('YYYY-MM-DD HH:mm:ss'))
                            }
                        }}
                    />
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Keterangan
                    </label>
                    <textarea
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    ></textarea>
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
