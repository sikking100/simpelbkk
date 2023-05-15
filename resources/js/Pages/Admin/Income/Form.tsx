import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { Group } from "@/Inteface/Group";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { Income } from "@/Inteface/Income";

interface Props {
    groups: Array<Group>
    income?: Income
}

interface FormProps {
    group_id: number
    date: string
    received: number
    income: number
    description: string
}

export default function Form({ groups, income }: Props) {
    type keys = keyof FormProps

    const { data, setData, post, put, errors } = useForm<FormProps>({
        group_id: income?.group_id ?? 0,
        date: income?.date ?? moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        received: income?.received ?? 0,
        income: income?.income ?? 0,
        description: income?.description ?? ''
    })

    const title = income === undefined ? 'Simpan' : 'Ubah'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keys, e.target.value)
    }


    return (
        <form className="w-full p-6" onSubmit={(e) => {
            e.preventDefault()
            if (income === undefined) {
                post(route('income.store'))
                return
            }
            put(route('income.update', income?.id))
        }}>
            <BackButton
                router={'income'}
            />
            <div className="-mx-3 mb-2">
                <div className="w-full px-3">
                    <label className={'form-label'}>
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
                    <ErrorText message={errors.date} />
                </div>

                <div className="w-full px-3">
                    <label className={'form-label'}>
                        Tanggal
                    </label>
                    <DatePicker
                        value={moment(data.date).format('DD MMMM YYYY')}
                        className={'form-input'}
                        onChange={(e) => {
                            if (e !== null) {
                                setData('date', moment(e).format('YYYY-MM-DD HH:mm:ss'))
                            }
                        }}
                    />
                    <ErrorText message={errors.date} />
                </div>


                <div className="w-full px-3">
                    <label className="form-label">
                        Anggaran Diterima
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={Intl.NumberFormat('id').format(data.received)}
                        name={'received'}
                        onChange={(e) => {
                            if (e.target.value.includes('.')) {
                                const v = e.target.value.split('.').join('')
                                console.log(v);
                                setData('received', Number.parseInt(v))
                                return
                            }
                            setData('received', Number.parseInt(e.target.value))
                            return
                        }}
                    />
                    <ErrorText message={errors.received} />
                </div>
                <div className="w-full px-3">
                    <label className="form-label">
                        Pendapatan
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={Intl.NumberFormat('id').format(data.income)}
                        name={'income'}
                        onChange={(e) => {
                            if (e.target.value.includes('.')) {
                                const v = e.target.value.split('.').join('')
                                console.log(v);
                                setData('income', Number.parseInt(v))
                                return
                            }
                            setData('income', Number.parseInt(e.target.value))
                            return
                        }}
                    />
                    <ErrorText message={errors.income} />
                </div>
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Keterangan Penjualan Barang/Jasa
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
