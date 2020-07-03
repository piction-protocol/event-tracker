package network.piction.tracker.api.requests

import network.piction.tracker.common.entities.ParentEntity

interface IRequest {
    fun validate(args: Array<Any>)

    fun <T : ParentEntity> toEntity(): T? {
        return null
    }
}