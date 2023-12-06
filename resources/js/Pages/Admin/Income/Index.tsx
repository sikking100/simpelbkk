import Alert from '@/Component/Alert'
import { PagesProps } from '@/Inteface/Global'
import { Group } from '@/Inteface/Group'
import { Income } from '@/Inteface/Income'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import route from 'ziggy-js'

interface Props extends PagesProps {
    groups: Array<Group>
}

export default function Index({ auth, errors, groups, flash }: Props) {
    const [showAlert, setShowAlert] = useState(true);
    const [incomes, setIncome] = useState<Array<Income>>([])

    useEffect(() => {
        console.log('initialize interval')
        if (showAlert == false) {
            setShowAlert(true)
        }
        const interval = setInterval(() => {
            if (showAlert == true) {
                setShowAlert(false)
            }
            return
        }, 5000)
        return () => {
            console.log('clearing interval')
            clearInterval(interval)
        }
    }, [])

    function getData(id: number) {
        console.log(id);

        axios.get(`/group/${id}/incomes`).then((e) => {
            const v = e.data.incomes as Array<Income>
            setIncome(v)
        }).catch((e) => console.log(e));
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === '0') {
            setIncome([])
            return
        }
        getData(Number.parseInt(e.target.value))
        return
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Laporan Pendapatan'}
        >
            <Head
                title='Laporan Pendapatan'
            />
            <Alert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={flash?.message ?? ''}
            />
            <InertiaLink
                href={route('income.create')}
                className='btn'
            >
                Tambah
            </InertiaLink>
            <div
                className='mt-6'
            >
                <select onChange={handleChange} className='form-input mb-6'>
                    <option value="0">-- Pilih Kelompok --</option>
                    {groups.map((e, i) => (<option value={e.id} key={i}>{e.name}</option>))}
                </select>
                {incomes.length === 0 ? (
                    <div>
                        <p>Data Kosong</p>
                    </div>
                ) : (
                    <div className='w-full overflow-auto'>
                        <p>Total {Intl.NumberFormat('id').format(incomes.map(e => parseInt(`${e.income}`)).reduce((e, v) => e + v))}</p>
                        <table className='mt-6 table table-auto w-full border-collapse border border-slate-500'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Anggaran Diterima</th>
                                    <th>Pendapatan</th>
                                    <th>Keterangan Penjualan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incomes.map((e, i) => (
                                    <tr key={i}  >
                                        <td>{i + 1}</td>
                                        <td>{moment(e.date).format('DD MMMM YYYY')}</td>
                                        <td>{Intl.NumberFormat('id').format(e.received)}</td>
                                        <td>{Intl.NumberFormat('id').format(e.income)}</td>
                                        <td>{e.description}</td>
                                        <td><div className='flex gap-2'>
                                            <InertiaLink
                                                href={route('income.edit', e.id)}
                                                className='btn bg-blue-500'>
                                                Ubah
                                            </InertiaLink>
                                            <button
                                                onClick={(r) => {
                                                    r.preventDefault()
                                                    if (confirm("Yakin ingin mengahpus data?")) {
                                                        setShowAlert(true)
                                                        Inertia.delete(route('income.destroy', e.id));
                                                        setIncome([])
                                                    }
                                                }}
                                                className={'btn bg-red-700'}
                                            >
                                                Hapus
                                            </button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </Authenticated>
    )
}
