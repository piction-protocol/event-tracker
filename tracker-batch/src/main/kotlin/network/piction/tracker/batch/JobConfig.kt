package network.piction.tracker.batch

import com.klaytn.caver.methods.response.KlayLogs
import network.piction.tracker.common.entities.EventLogEntity
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory
import org.springframework.batch.core.configuration.annotation.JobScope
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory
import org.springframework.batch.core.step.tasklet.TaskletStep
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class JobConfig(
    val jobBuilderFactory: JobBuilderFactory,
    val stepBuilderFactory: StepBuilderFactory,
    val taskCompletionListener: TaskCompletionListener) {

    @Bean
    fun taskJob(
        taskStep: TaskletStep
    ) = jobBuilderFactory.get("[TASK JOB]")
        .start(taskStep)
        .listener(taskCompletionListener)
        .build()

    @Bean
    @JobScope
    fun taskStep(
        taskReader: TaskReader,
        taskProcessor: TaskProcessor,
        taskWriter: TaskWriter
    ) = stepBuilderFactory.get("[TASK STEP]")
        .chunk<KlayLogs.Log, EventLogEntity>(100)
        .reader(taskReader)
        .processor(taskProcessor)
        .writer(taskWriter)
        .build()
}
