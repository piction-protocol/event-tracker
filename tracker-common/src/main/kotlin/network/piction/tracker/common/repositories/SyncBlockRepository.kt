package network.piction.tracker.common.repositories

import network.piction.tracker.common.entities.SyncBlockEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository


@Repository
interface SyncBlockRepository : JpaRepository<SyncBlockEntity, Long> {

    @Query("SELECT max(sb.number) FROM SyncBlockEntity sb")
    fun getMaxNumber(): Long?

    @Query("SELECT min(sb.number) FROM SyncBlockEntity sb")
    fun getMinNumber(): Long?
}
