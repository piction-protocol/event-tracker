package network.piction.tracker.api.requests

import network.piction.tracker.api.config.UserPrincipal
import network.piction.tracker.common.entities.ContractEntity
import network.piction.tracker.common.entities.ParentEntity
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

data class CreateContractRequest(
    val name: String,
    val address: String,
    val description: String?
) : IRequest {
    override fun validate(args: Array<Any>) {
        if (name.isNullOrBlank())
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Please enter a name.")
        if (address.matches(Regex("^0x[0-9a-fA-F]{40}$")).not())
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "The contract address format is incorrect.")

    }

    @Suppress("UNCHECKED_CAST")
    override fun <T : ParentEntity> toEntity(): T {
        val entity = ContractEntity()
        entity.name = name
        entity.address = address
        entity.description = description.orEmpty()

        return entity as T
    }
}