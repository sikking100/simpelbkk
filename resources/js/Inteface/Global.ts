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
    }

}