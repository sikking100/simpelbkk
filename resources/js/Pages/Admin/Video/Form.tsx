import { BackButton } from "@/Component/Button";
import { ErrorText } from "@/Component/Error";
import { Video } from "@/Inteface/Video";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";

interface Props {
    video?: Video
}

interface FormProps {
    url: string
}

export default function Form({ video }: Props) {
    const { data, setData, post, put, errors } = useForm<FormProps>({
        url: video?.url ?? ''
    })

    const title = video === undefined ? 'Simpan' : 'Ubah'
    return (
        <form className="w-full p-6" onSubmit={(e) => {
            e.preventDefault()
            if (video === undefined) {
                post(route('video.store'))
                return
            }
            put(route('video.update', video?.id))
        }}>
            <BackButton
                router={'video'}
            />
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Nama
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading tight"
                        type={'text'}
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                    />
                    <ErrorText message={errors.url} />
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
