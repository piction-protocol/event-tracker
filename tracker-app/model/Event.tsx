import Contract from "./Contract";
import EventParam from "./EventParam";

export default interface Event {
    id: number
    name: string
    description: string
    contract: Contract
    signature: string
    params: Array<EventParam>
}
