package network.piction.tracker.common.repositories

import network.piction.tracker.common.entities.EventLogEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EventLogRepository : JpaRepository<EventLogEntity, Long> {
    fun findByAddressAndSignature(pageable: Pageable, address: String, signature: String): Page<EventLogEntity>
}
