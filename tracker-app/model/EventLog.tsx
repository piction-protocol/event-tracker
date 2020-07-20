export default interface EventLog {
    id: number
    address: string
    topic: string
    values: Array<string>
    signature: string
    transactionHash: string
    topics: string
    data: string
    log_index: number
    blockTime: number
    timestamp: number
}
