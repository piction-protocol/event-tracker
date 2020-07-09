package network.piction.tracker.api.controllers

import network.piction.tracker.api.config.UserPrincipal
import network.piction.tracker.api.requests.CreateContractRequest
import network.piction.tracker.api.requests.UpdateContractRequest
import network.piction.tracker.common.entities.ContractEntity
import network.piction.tracker.common.repositories.ContractRepository
import network.piction.tracker.common.repositories.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid

@RestController
@RequestMapping("/contracts")
class ContractController(
    val userRepository: UserRepository,
    val contractRepository: ContractRepository) {

    @GetMapping("/{id}")
    fun contract(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("id") contract: ContractEntity): ContractEntity {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        return contract
    }

    @GetMapping
    fun contracts(
        @AuthenticationPrincipal principal: UserPrincipal,
        pageable: Pageable): Page<ContractEntity> {

        val pageRequest = PageRequest.of(
            pageable.pageNumber - 1,
            pageable.pageSize,
            Sort(Sort.Direction.DESC, "createdAt")
        )

        return contractRepository.findByUserId(principal.id, pageRequest)
    }

    @PostMapping
    fun create(
        @AuthenticationPrincipal principal: UserPrincipal,
        @Valid @RequestBody request: CreateContractRequest) {

        request.toEntity<ContractEntity>().run {
            user = userRepository.findByUsername(principal.username)!!
            contractRepository.save(this)
        }
    }

    @PutMapping("/{id}")
    fun update(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("id") contract: ContractEntity,
        @Valid @RequestBody request: UpdateContractRequest) {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        contract.name = request.name
        contract.address = request.address
        contract.description = request.description.orEmpty()

        contractRepository.save(contract)
    }

    @DeleteMapping("/{id}")
    fun delete(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("id") contract: ContractEntity) {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        contractRepository.delete(contract)
    }
}
