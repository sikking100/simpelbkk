import Alert from '@/Component/Alert'
import { ErrorText } from '@/Component/Error'
import Input from '@/Component/Input'
import { PagesProps } from '@/Inteface/Global'
import { Pagu } from '@/Inteface/Pagu'
import Authenticated from '@/Layouts/Authenticated'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'
import DatePicker from 'react-datepicker'
import moment from 'moment'


interface Props extends PagesProps {
    pagu?: Pagu
}

interface FormProps {
    value: number
    date: string
}

export default function Index({ auth, pagu, flash }: Props) {
    const [showAlert, setShowAlert] = React.useState(true);
    const { data, setData, post, put, errors } = useForm<FormProps>({
        value: pagu?.value ?? 0,
        date: pagu?.date ?? moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    })

    React.useEffect(() => {
        console.log('initialize interval')
        if (showAlert == false) {
            setShowAlert(true)
        }
        const interval = setInterval(() => {
            if (showAlert == true) {
                setShowAlert(false)
            }
            return
        }, 8000)
        return () => {
            console.log('clearing interval')
            clearInterval(interval)
        }
    }, [])

    const title = pagu === null ? 'Simpan' : 'Ubah'

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Pagu'}
        >
            <Head
                title='Pagu'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <div
                className='mt-6'
            >
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (pagu === null) {
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
                                    setData('date', moment(e).format('YYYY-MM-DD HH:mm:ss'))
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
                                if (e.target.value.includes('.')) {
                                    const v = e.target.value.split('.').join('')
                                    console.log(v);
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
            </div>

        </Authenticated>
    )
}
