package network.piction.tracker.common.entities

import java.io.Serializable
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.MappedSuperclass
import javax.persistence.PrePersist
import javax.persistence.PreUpdate

@MappedSuperclass
open class ParentEntity : Serializable {

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime? = null

    @Column(name = "created_at", nullable = false, updatable = false)
    lateinit var createdAt: LocalDateTime

    @PreUpdate
    fun preUpdate() {
        updatedAt = LocalDateTime.now()
    }

    @PrePersist
    fun prePersist() {
        createdAt = LocalDateTime.now()
    }
}
