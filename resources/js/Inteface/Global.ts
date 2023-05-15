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
    'Tamat SD / Sederajat',
    'Tamat SMP / Sederajat',
    'Tamat SMA/SMK / Sederajat',
    'Tamat D-1 / Sederajat',
    'Tamat D-2 / Sederajat',
    'Tamat D-3 / Sederajat',
    'Tamat D-4 / Sederajat',
    'Tamat S-1 / Sederajat',
    'Tamat S-2 / Sederajat',
    'Tamat S-3 / Sederajat',
    'SEdang SLB A / Sederajat',
    'SEdang SLB B / Sederajat',
    'SEdang SLB C / Sederajat',
    'Tamat SLB A / Sederajat',
    'Tamat SLB B / Sederajat',
    'Tamat SLB C / Sederajat',
    'Tidak pernah sekolah',
    'Tidak dapat membaca dan menulis',
    'Tidak tamat SD/sederajat',
]
