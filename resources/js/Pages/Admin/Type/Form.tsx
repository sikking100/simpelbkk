import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { TypeOfAction } from "@/Inteface/TypeOfAction";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";

interface Props {
    typeOfAction?: TypeOfAction | undefined
}

interface FormProps {
    name: string
}

export default function Form({ typeOfAction }: Props) {
    const { data, setData, post, put, errors } = useForm<FormProps>({
        name: typeOfAction?.name ?? ''
    })

    const title = typeOfAction === undefined ? 'Simpan' : 'Ubah'
    return (
        <form className="w-full p-6" onSubmit={(e) => {
            e.preventDefault()
            if (typeOfAction === undefined) {
                post(route('typeOfAction.store'))
                return
            }
            put(route('typeOfAction.update', typeOfAction.id))
        }}>
            <BackButton
                router={'district'}
            />
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nama
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <ErrorText message={errors.name} />
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
