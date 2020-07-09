package network.piction.tracker.api.services.impl

import network.piction.tracker.api.services.EventService
import network.piction.tracker.common.entities.EventParamEntity
import network.piction.tracker.common.enums.ValueType
import org.springframework.stereotype.Service
import org.web3j.abi.TypeReference
import org.web3j.abi.datatypes.*
import org.web3j.abi.datatypes.generated.Uint256

@Service
class EventServiceImpl : EventService {

    override fun getWeb3jEvent(eventName: String, params: MutableList<EventParamEntity>): Event {
        val params = params
            .sortedBy { it.priority }
            .map {
                when (it.type) {
                    ValueType.Address -> object : TypeReference<Address>(it.index) {}
                    ValueType.Uint -> object : TypeReference<Uint>(it.index) {}
                    ValueType.Uint256 -> object : TypeReference<Uint256>(it.index) {}
                    ValueType.Utf8String -> object : TypeReference<Utf8String>(it.index) {}
                    ValueType.Bool -> object : TypeReference<Bool>(it.index) {}
                }
            }
        return Event(eventName, params)
    }
}
