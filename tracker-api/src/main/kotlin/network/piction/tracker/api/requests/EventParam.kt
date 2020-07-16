package network.piction.tracker.api.requests

import network.piction.tracker.common.enums.ValueType

data class EventParam(
    val name: String,
    val type: ValueType,
    val decimal: Int = 0,
    val index: Boolean
)