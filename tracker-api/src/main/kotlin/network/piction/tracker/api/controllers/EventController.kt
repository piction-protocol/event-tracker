package network.piction.tracker.api.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import com.klaytn.caver.methods.response.KlayLogs
import com.klaytn.caver.tx.SmartContract
import network.piction.tracker.api.config.UserPrincipal
import network.piction.tracker.api.extensions.cleanDecimalPretty
import network.piction.tracker.api.requests.CreateEventRequest
import network.piction.tracker.api.requests.UpdateEventRequest
import network.piction.tracker.api.services.EventService
import network.piction.tracker.common.entities.ContractEntity
import network.piction.tracker.common.entities.EventEntity
import network.piction.tracker.common.entities.EventLogEntity
import network.piction.tracker.common.entities.EventParamEntity
import network.piction.tracker.common.enums.ValueType
import network.piction.tracker.common.repositories.ContractRepository
import network.piction.tracker.common.repositories.EventLogRepository
import network.piction.tracker.common.repositories.EventRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.web3j.abi.EventEncoder
import javax.validation.Valid

@RestController
@RequestMapping("/contracts/{contractId}/events")
class EventController(
    val eventService: EventService,
    val contractRepository: ContractRepository,
    val eventRepository: EventRepository,
    val eventLogRepository: EventLogRepository) {

    @GetMapping("/{eventId}")
    fun event(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("contractId") contract: ContractEntity,
        @PathVariable("eventId") event: EventEntity): EventEntity {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        check(contract == event.contract) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }

        return event
    }

    @GetMapping
    fun events(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("contractId") contract: ContractEntity,
        pageable: Pageable): Page<EventEntity> {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        val pageRequest = PageRequest.of(
            pageable.pageNumber - 1,
            pageable.pageSize,
            Sort(Sort.Direction.DESC, "createdAt")
        )

        return eventRepository.findByContract(pageRequest, contract)
    }

    @PostMapping
    fun create(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("contractId") contract: ContractEntity,
        @Valid @RequestBody request: CreateEventRequest) {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        request.toEntity<EventEntity>().run {
            this.params = request.params.mapIndexed { index, eventParam ->
                EventParamEntity().apply {
                    this.name = eventParam.name
                    this.type = eventParam.type
                    this.decimal = eventParam.decimal
                    this.index = eventParam.index
                    this.priority = index
                    this.event = this@run
                }
            }.toMutableList()
            this.contract = contractRepository.getOne(contract.id)
            this.signature = EventEncoder.encode(eventService.getWeb3jEvent(request.name, this.params))

            eventRepository.save(this@run)
        }
    }

    @PutMapping("/{eventId}")
    fun edit(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("contractId") contract: ContractEntity,
        @PathVariable("eventId") event: EventEntity,
        @Valid @RequestBody request: UpdateEventRequest) {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        check(contract == event.contract) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }

        event.params = request.params.mapIndexed { index, eventParam ->
            EventParamEntity().apply {
                this.name = eventParam.name
                this.type = eventParam.type
                this.decimal = eventParam.decimal
                this.index = eventParam.index
                this.priority = index
                this.event = event
            }
        }.toMutableList()
        event.contract = contractRepository.getOne(contract.id)
        event.signature = EventEncoder.encode(eventService.getWeb3jEvent(request.name, event.params))

        eventRepository.save(event)
    }

    @DeleteMapping("/{eventId}")
    fun delete(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("contractId") contract: ContractEntity,
        @PathVariable("eventId") event: EventEntity) {

        check(contract.user.id == principal.id) {
            throw ResponseStatusException(HttpStatus.FORBIDDEN)
        }

        check(contract == event.contract) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }

        eventRepository.delete(event)
    }

    @GetMapping("/{eventId}/logs")
    fun logs(
        @AuthenticationPrincipal principal: UserPrincipal,
        @PathVariable("contractId") contract: ContractEntity,
        @PathVariable("eventId") event: EventEntity,
        pageable: Pageable): Page<EventLogEntity> {

        val pageRequest = PageRequest.of(
            pageable.pageNumber - 1,
            pageable.pageSize,
            Sort(Sort.Direction.DESC, "blockTime")
        )
        var result = eventLogRepository.findByAddressAndSignature(pageRequest, event.contract.address, event.signature)

        val web3jEvent = eventService.getWeb3jEvent(event.name, event.params)
        result.content.forEach {
            val log = KlayLogs.Log().apply {
                topics = ObjectMapper().readValue(it.topics, Array<String>::class.java).toList()
                data = it.data
            }

            val eventValues = try {
                SmartContract.staticExtractEventParameters(web3jEvent, log)
            } catch (e: Exception) {
                throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Parameter index setting is incorrect.")
            }

            it.values = event.params.map { param ->
                val value = when (param.index) {
                    true -> eventValues.indexedValues
                    false -> eventValues.nonIndexedValues
                }.removeAt(0).value.toString()

                when {
                    param.type == ValueType.Uint256 && param.decimal > 0 -> value.cleanDecimalPretty(param.decimal)
                    param.type == ValueType.Uint && param.decimal > 0 -> value.cleanDecimalPretty(param.decimal)
                    else -> value
                }
            }
        }

        return result
    }
}
