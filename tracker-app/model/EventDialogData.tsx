import EventItem from "./EventItem";

export default interface EventDialogData {
    show: boolean
    contractId: string
    selected: EventItem
    handle: (refresh: boolean) => void
}