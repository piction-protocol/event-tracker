package network.piction.tracker.common.entities

import java.io.Serializable
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "sync_blocks")
class SyncBlockEntity : Serializable {

    @Id
    var number: Long = 0

    @Column(name = "block_timestamp", nullable = false)
    lateinit var blockTimestamp: LocalDateTime
}
