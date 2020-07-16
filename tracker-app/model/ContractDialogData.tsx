import ContractItem from "./ContractItem";

export default interface ContractDialogData {
    show: boolean
    selected: ContractItem
    handle: (refresh: boolean) => void
}