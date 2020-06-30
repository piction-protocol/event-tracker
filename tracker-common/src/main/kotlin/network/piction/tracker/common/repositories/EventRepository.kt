package network.piction.tracker.common.repositories

import network.piction.tracker.common.entities.EventEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EventRepository : JpaRepository<EventEntity, Long> {
    fun findByContractIdAndId(contractId: Long, eventId: Long): EventEntity?
    fun findByContractId(pageable: Pageable, contractId: Long): Page<EventEntity>
}
