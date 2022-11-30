import { PagesProps } from "@/Inteface/Global";
import { User } from "@/Inteface/User";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import React from "react";



export default function Dashboard({ auth, errors }: PagesProps) {

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={'Dashboard'}
        >
            <Head
                title="Dashboard" />
            <form>
                <select className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                    <option>-- Pilih Tahun --</option>
                </select>
            </form>
            <div className="grid grid-cols-2 mt-6 gap-6">
                <div
                    className="card-dashboard"
                >
                    Pendapatan Kelompok Penerima Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                </div>
                <div className="card-dashboard">
                    Total Penerima Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                </div>
                <div className="card-dashboard">
                    Total Dana Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                </div>
                <div className="card-dashboard">
                    Realisasi Dana Bkk {auth?.user.type === 'desa' ? 'Desa' : ''}
                </div>
            </div>
        </Authenticated>
    )
}
