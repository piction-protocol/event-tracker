package network.piction.tracker.batch

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class SyncExecutor {

    @Scheduled(fixedDelay = 1000)
    fun sync() {
        println("sync")
    }
}
