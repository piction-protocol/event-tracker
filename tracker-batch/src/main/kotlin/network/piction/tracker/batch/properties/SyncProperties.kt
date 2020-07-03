package network.piction.tracker.batch.properties

import network.piction.tracker.batch.enums.NetworkType
import network.piction.tracker.batch.enums.ScopeType
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties("sync")
object SyncProperties {
    var network = NetworkType.BAOBAB
    var forward = false
    var back = false
    var scope = ScopeType.REGISTERED_EVENTS
}
