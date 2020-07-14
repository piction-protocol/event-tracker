
export default interface DialogData<T> {
    show: boolean
    selected: T
    handle: (refresh: boolean) => void
}