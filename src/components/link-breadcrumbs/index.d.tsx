interface Breadcrumb {
    name: string;
    link?: string;
}

export interface LinkBreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
}
