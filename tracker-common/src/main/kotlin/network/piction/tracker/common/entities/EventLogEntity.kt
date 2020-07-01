package network.piction.tracker.common.entities

import java.math.BigInteger
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "event_logs")
class EventLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    lateinit var address: String

    lateinit var signature: String

    @Column(name = "transaction_hash")
    lateinit var transactionHash: String

    lateinit var topics: String

    lateinit var data: String

    @Column(name = "log_index")
    lateinit var logIndex: BigInteger

    @Column(name = "block_time")
    var blockTime: Long = 0

    lateinit var timestamp: LocalDateTime

    @Transient
    var values: List<String?> = mutableListOf()
}
