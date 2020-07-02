package network.piction.tracker.batch

import com.klaytn.caver.methods.response.KlayLogs
import network.piction.tracker.batch.enums.ScopeType
import network.piction.tracker.batch.properties.SyncProperties
import network.piction.tracker.common.repositories.EventRepository
import org.springframework.batch.core.configuration.annotation.StepScope
import org.springframework.batch.item.ItemReader
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
@StepScope
class TaskReader(
    @Value("#{jobParameters[blockHash]}") val blockHash: String,
    eventRepository: EventRepository) : ItemReader<KlayLogs.Log> {

    private var blocks: LinkedList<KlayLogs.Log> = LinkedList()

    init {
        val events = eventRepository.findAll().map { it.signature }
        SyncExecutor.caver.klay()
            .getBlockReceipts(blockHash)
            .send().result
            .flatMap { t -> t.logs }
            .filter {
                when (SyncProperties.scope) {
                    ScopeType.ALL -> true
                    ScopeType.REGISTERED_EVENTS -> events.contains(it.topics[0])
                }
            }.run { blocks.addAll(this) }
    }

    override fun read(): KlayLogs.Log? {
        return blocks.poll()
    }
}
