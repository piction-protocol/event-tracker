package network.piction.tracker

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableBatchProcessing
@EnableScheduling
class TrackerBatchApplication

fun main(args: Array<String>) {
    runApplication<TrackerBatchApplication>(*args)
}

