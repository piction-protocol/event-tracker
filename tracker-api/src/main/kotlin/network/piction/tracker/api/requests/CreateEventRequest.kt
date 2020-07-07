package network.piction.tracker.api.requests

import network.piction.tracker.common.entities.EventEntity
import network.piction.tracker.common.entities.EventParamEntity
import network.piction.tracker.common.entities.ParentEntity
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

data class CreateEventRequest(
    val name: String,
    var params: MutableList<EventParamEntity> = arrayListOf(),
    val description: String?
) : IRequest {
    override fun validate(args: Array<Any>) {
        if (name.isNullOrBlank())
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Please enter a event name.")
        params.forEach {
            if (it.name.isNullOrBlank())
                throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Please enter a param name.")
        }
    }

    @Suppress("UNCHECKED_CAST")
    override fun <T : ParentEntity> toEntity(): T {
        val entity = EventEntity()
        entity.name = name
        entity.description = description.orEmpty()

        return entity as T
    }
}