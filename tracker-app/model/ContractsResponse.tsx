import Contract from "./Contract";
import Pageable from "./Pageable";

export default interface ContractsResponse {
    content: Array<Contract>
    pageable: Pageable
    size: number
    totalPages: number
    totalElements: number
}