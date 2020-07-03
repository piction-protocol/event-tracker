export default interface EventLog {
    id: number
    address: string
    signature: string
    transaction_hash: string
    topics: string
    data: string
    log_index: number
    block_time: number
    timestamp: number
}
