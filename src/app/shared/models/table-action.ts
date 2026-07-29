export interface TableAction<T = any>{
    label: string
    icon?: string
    cssClass?: string
    onClick: (row: T) => void
}