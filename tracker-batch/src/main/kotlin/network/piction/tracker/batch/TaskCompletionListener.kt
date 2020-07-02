package network.piction.tracker.batch

import network.piction.tracker.common.entities.SyncBlockEntity
import network.piction.tracker.common.repositories.SyncBlockRepository
import org.springframework.batch.core.JobExecution
import org.springframework.batch.core.listener.JobExecutionListenerSupport
import org.springframework.stereotype.Component
import java.time.Instant
import java.time.LocalDateTime
import java.util.*

@Component
class TaskCompletionListener(val syncBlockRepository: SyncBlockRepository) : JobExecutionListenerSupport() {

    override fun beforeJob(jobExecution: JobExecution) {}

    override fun afterJob(jobExecution: JobExecution) {
        val blockNumber = jobExecution.jobParameters.getLong("blockNumber")
        val blockTime = jobExecution.jobParameters.getLong("blockTime")
        if (blockNumber > 0) {
            SyncBlockEntity().apply {
                number = blockNumber
                blockTimestamp = LocalDateTime.ofInstant(Instant.ofEpochMilli(blockTime * 1000),
                    TimeZone.getDefault().toZoneId())
            }.run {
                syncBlockRepository.save(this)
            }
        }
    }
}
