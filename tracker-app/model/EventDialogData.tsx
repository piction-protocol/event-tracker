import Event from "./Event";

export default interface EventDialogData {
    show: boolean
    contractId: string
    selected: Event
    handle: (refresh: boolean) => void
}