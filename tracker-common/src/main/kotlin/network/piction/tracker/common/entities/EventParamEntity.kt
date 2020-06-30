package network.piction.tracker.common.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import network.piction.tracker.common.enums.ValueType
import javax.persistence.*

@Entity
@Table(name = "event_params")
class EventParamEntity : ParentEntity() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    lateinit var name: String

    @Enumerated(EnumType.STRING)
    lateinit var type: ValueType

    @Column(name = "`decimal`")
    var decimal: Int = 0

    @Column(name = "`index`")
    var index = false

    var priority = 0

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "event_id")
    lateinit var event: EventEntity
}
