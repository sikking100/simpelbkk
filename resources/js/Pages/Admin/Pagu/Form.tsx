import { ErrorText } from "@/Component/Error"
import Input from "@/Component/Input"
import { Pagu } from "@/Inteface/Pagu"
import { useForm } from "@inertiajs/inertia-react"
import React from "react"
import route from "ziggy-js"
import DatePicker from 'react-datepicker'
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    pagu?: Pagu
}

interface FormProps {
    value: number
    date: string
}

export default function Form({ pagu }: Props) {

    const { data, setData, post, put, errors } = useForm<FormProps>({
        value: pagu?.value ?? 0,
        date: pagu?.date ?? moment(new Date()).format('DD MMMM YYYY')
    })

    const title = pagu === undefined ? 'Simpan' : 'Ubah'

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            if (pagu === null || pagu === undefined) {
                post(route('pagu.store'))
            } else {
                put(route('pagu.update', pagu?.id))
            }
        }}>
            <div className="w-full px-3">
                <label className={'form-label'}>
                    Tanggal
                </label>
                <DatePicker
                    value={moment(data.date).format('DD MMMM YYYY')}
                    className={'form-input'}
                    onChange={(e) => {
                        if (e !== null) {
                            setData('date', moment(e).format('YYYY-MM-DD'))
                        }
                    }}
                />
                <ErrorText message={errors.date} />
            </div>

            <div className="w-full px-3">
                <label className={'form-label'}>
                    Jumlah
                </label>
                <Input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight'
                    type={'text'}
                    name={'value'}
                    value={Intl.NumberFormat('id').format(data.value)}
                    onChange={(e) => {
                        console.log(e.target.value);
                        if (e.target.value === '0' || e.target.value === '') {
                            setData('value', Number.parseInt('0'))
                            return
                        }
                        if (e.target.value.includes('.')) {
                            const v = e.target.value.split('.').join('')
                            setData('value', Number.parseInt(v))
                            return
                        }
                        setData('value', Number.parseInt(e.target.value))
                        return
                    }}
                />
                <ErrorText message={errors.value} />
            </div>

            <input type="submit" value={title} className={'btn'} />
        </form>
    )
}
