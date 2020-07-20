import Event from "./Event";
import EventParam from "./EventParam";

export default interface EventParamRowData {
    loading: boolean
    rowData: Array<EventParam>
    updater: (params: Array<EventParam>) => void
}