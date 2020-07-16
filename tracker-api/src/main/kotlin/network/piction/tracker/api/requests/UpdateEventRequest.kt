package network.piction.tracker.api.requests

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

data class UpdateEventRequest(
    val name: String,
    var params: MutableList<EventParam> = arrayListOf(),
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
}