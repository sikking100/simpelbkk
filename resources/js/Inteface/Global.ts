import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia";

interface PgProps extends Page<PageProps> {
    props: {
        siteKey: string
        errors: Errors & ErrorBag
    }
}