import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia";
import { User } from "./User";

export interface PgProps extends Page<PageProps> {
    props: {
        siteKey: string
        errors: Errors & ErrorBag
    }
}

export interface PagesProps {
    auth?: {
        user: User
    }
    errors?: {
        [key: string]: any | null
    }

    flash?: {
        message: string
        password?: string
    }

}


export const pendidikan: Array<string> = [
    'Tamat SD/sederajat',
    'Tamat STLP/sederajat',
    'Tamat STLA/sederajat',
    'Tamat D-1/sederajat',
    'Tamat D-2/sederajat',
    'Tamat D-3/sederajat',
    'Tamat D-4/sederajat',
    'Tamat S-1/sederajat',
    'Tamat S-2/sederajat',
    'Tamat S-3/sederajat',
    'SEdang SLB A/sederajat',
    'SEdang SLB B/sederajat',
    'SEdang SLB C/sederajat',
    'Tamat SLB A/sederajat',
    'Tamat SLB B/sederajat',
    'Tamat SLB C/sederajat',
    'Tidak pernah sekolah',
    'Tidak dapat membaca dan menulis',
    'Tidak tamat SD/sederajat',
]