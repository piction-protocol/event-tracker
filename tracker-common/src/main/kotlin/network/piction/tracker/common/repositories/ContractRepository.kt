package network.piction.tracker.common.repositories

import network.piction.tracker.common.entities.ContractEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ContractRepository : JpaRepository<ContractEntity, Long> {
    fun findByIdAndUserId(id: Long, userId: Long): ContractEntity?
    fun findByUserId(userId: Long, pageable: Pageable): Page<ContractEntity>
}
