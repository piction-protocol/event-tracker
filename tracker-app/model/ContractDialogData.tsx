import Contract from "./Contract";

export default interface ContractDialogData {
    show: boolean
    selected: Contract
    handle: (refresh: boolean) => void
}