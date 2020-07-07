package network.piction.tracker.api.converters

import network.piction.tracker.common.entities.EventEntity
import network.piction.tracker.common.repositories.EventRepository
import org.springframework.core.convert.converter.Converter
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

class IdToEventConverter {

    @Component
    class IdToContentConverter(val eventRepository: EventRepository) : Converter<Long, EventEntity> {
        override fun convert(source: Long): EventEntity? = eventRepository.findByIdOrNull(source)
    }
}