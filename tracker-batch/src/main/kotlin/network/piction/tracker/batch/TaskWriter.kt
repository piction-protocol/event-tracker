package network.piction.tracker.batch

import network.piction.tracker.common.entities.EventLogEntity
import network.piction.tracker.common.repositories.EventLogRepository
import org.springframework.batch.core.configuration.annotation.StepScope
import org.springframework.batch.item.ItemWriter
import org.springframework.stereotype.Component

@Component
@StepScope
class TaskWriter(val eventLogRepository: EventLogRepository) : ItemWriter<EventLogEntity> {

    override fun write(items: MutableList<out EventLogEntity>) {
        items.forEach {
            save(it)
        }
    }

    private fun save(eventLogEntity: EventLogEntity) = try {
        eventLogRepository.save(eventLogEntity)
    } catch (e: Exception) {
        null
    }
}
