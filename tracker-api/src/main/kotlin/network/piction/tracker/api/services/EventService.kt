package network.piction.tracker.api.services

import network.piction.tracker.common.entities.EventParamEntity

interface EventService {
    fun getWeb3jEvent(eventName: String, params: MutableList<EventParamEntity>): org.web3j.abi.datatypes.Event
}
