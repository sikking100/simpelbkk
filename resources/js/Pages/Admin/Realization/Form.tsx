import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { Group } from "@/Inteface/Group";
import { Realization } from "@/Inteface/Realization";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

interface Props {
    groups: Array<Group>
    realization?: Realization
}

interface FormProps {
    group_id: number
    date: string
    use: number
    amount: number
    description: string
}

export default function Form({ groups, realization }: Props) {
    type keys = keyof FormProps

    const { data, setData, post, put, errors } = useForm<FormProps>({
        group_id: realization?.group_id ?? 0,
        date: realization?.date ?? moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        use: realization?.use ?? 0,
        amount: realization?.amount ?? 0,
        description: realization?.description ?? ''
    })

    const title = realization === undefined ? 'Simpan' : 'Ubah'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keys, e.target.value)
    }


    return (
        <form className="w-full p-6" onSubmit={(e) => {
            e.preventDefault()
            if (realization === undefined) {
                post(route('realization.store'))
                return
            }
            put(route('realization.update', realization?.id))
        }}>
            <BackButton
                router={'realization'}
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
                        <option value={0}>-- Pilih Kategori --</option>
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
                        Penggunaan
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={Intl.NumberFormat('id').format(data.use)}
                        name={'use'}
                        onChange={(e) => {
                            if (e.target.value.includes('.')) {
                                const v = e.target.value.split('.').join('')
                                console.log(v);
                                setData('use', Number.parseInt(v))
                                return
                            }
                            setData('use', Number.parseInt(e.target.value))
                            return
                        }}
                    />
                    <ErrorText message={errors.use} />
                </div>
                <div className="w-full px-3">
                    <label className="form-label">
                        Jumlah
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={Intl.NumberFormat('id').format(data.amount)}
                        name={'amount'}
                        onChange={(e) => {
                            if (e.target.value.includes('.')) {
                                const v = e.target.value.split('.').join('')
                                console.log(v);
                                setData('amount', Number.parseInt(v))
                                return
                            }
                            setData('amount', Number.parseInt(e.target.value))
                            return
                        }}
                    />
                    <ErrorText message={errors.amount} />
                </div>
                <div className="w-full px-3 col-span-2">
                    <label className="form-label">
                        Keterangan Penggunaan
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
