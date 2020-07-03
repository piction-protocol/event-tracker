package network.piction.tracker.batch

import com.klaytn.caver.Caver
import network.piction.tracker.batch.properties.SyncProperties
import network.piction.tracker.common.repositories.SyncBlockRepository
import org.springframework.batch.core.Job
import org.springframework.batch.core.JobParametersBuilder
import org.springframework.batch.core.launch.JobLauncher
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.web3j.protocol.core.DefaultBlockParameter
import org.web3j.utils.Numeric
import java.math.BigInteger

@Component
class SyncExecutor(
    val jobLauncher: JobLauncher,
    val taskJob: Job,
    syncBlockRepository: SyncBlockRepository
) {

    final var backSyncBlockNumber: Long = 0
    final var forwardSyncBlockNumber: Long = 0

    companion object {
        val caver = Caver.build(SyncProperties.network.url)
    }

    init {
        var currentBlockNumber = caver.klay().blockNumber.send().value.toLong()
        backSyncBlockNumber = (syncBlockRepository.getMinNumber()?.let { it } ?: currentBlockNumber) - 1
        forwardSyncBlockNumber = syncBlockRepository.getMaxNumber()?.let { it + 1 } ?: currentBlockNumber
    }

    @Scheduled(initialDelay = 5 * 1000, fixedDelay = 100)
    fun backSync() {
        if (SyncProperties.back && backSyncBlockNumber > 0.toLong()) {
            sync(backSyncBlockNumber)
            backSyncBlockNumber--
        }
    }

    @Scheduled(initialDelay = 5 * 1000, fixedDelay = 10)
    fun forwardSync() {
        if (SyncProperties.forward && forwardSyncBlockNumber <= caver.klay().blockNumber.send().value.toLong()) {
            sync(forwardSyncBlockNumber)
            forwardSyncBlockNumber++
        }
    }

    private fun sync(blockNumber: Long) {
        val block = caver.klay()
            .getBlockByNumber(DefaultBlockParameter.valueOf(BigInteger.valueOf(blockNumber)), false)
            .send().block
        jobLauncher.run(
            taskJob, JobParametersBuilder()
            .addString("blockHash", block.hash)
            .addLong("blockNumber", Numeric.toBigInt(block.number).toLong())
            .addLong("blockTime", Numeric.toBigInt(block.timestamp).toLong())
            .toJobParameters()
        )
    }
}