import Pageable from "./Pageable";

export default interface PageResponse<T> {
    content: Array<T>
    pageable: Pageable
    size: number
    totalPages: number
    totalElements: number
}