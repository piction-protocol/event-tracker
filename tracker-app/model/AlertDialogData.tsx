export default interface AlertDialogData {
    show: boolean
    title: string
    msg: string
    handle: (confirm: boolean) => void
}