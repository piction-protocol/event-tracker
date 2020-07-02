package network.piction.tracker.batch

import com.fasterxml.jackson.databind.ObjectMapper
import com.klaytn.caver.methods.response.KlayLogs
import network.piction.tracker.common.entities.EventLogEntity
import org.springframework.batch.core.configuration.annotation.StepScope
import org.springframework.batch.item.ItemProcessor
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.time.Instant
import java.time.LocalDateTime
import java.util.*

@Component
@StepScope
class TaskProcessor(@Value("#{jobParameters[blockTime]}") val _blockTime: Long) : ItemProcessor<KlayLogs.Log, EventLogEntity> {

    @Throws(Exception::class)
    override fun process(log: KlayLogs.Log) = EventLogEntity().apply {
        this.address = log.address
        this.signature = log.topics[0]
        this.transactionHash = log.transactionHash
        this.topics = ObjectMapper().writeValueAsString(log.topics)
        this.data = log.data
        this.logIndex = log.logIndex
        this.blockTime = _blockTime
        this.timestamp = LocalDateTime.ofInstant(Instant.ofEpochMilli(_blockTime * 1000),
            TimeZone.getDefault().toZoneId())
    }
}
