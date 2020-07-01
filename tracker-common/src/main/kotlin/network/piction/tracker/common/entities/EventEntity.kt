package network.piction.tracker.common.entities

import javax.persistence.*

@Entity
@Table(name = "events")
class EventEntity : ParentEntity() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    lateinit var name: String

    lateinit var description: String

    @ManyToOne
    @JoinColumn(name = "contract_id")
    lateinit var contract: ContractEntity

    lateinit var signature: String

    @OneToMany(mappedBy = "event", cascade = [CascadeType.ALL], orphanRemoval = true)
    @OrderBy("priority")
    var params: MutableList<EventParamEntity> = arrayListOf()
}
