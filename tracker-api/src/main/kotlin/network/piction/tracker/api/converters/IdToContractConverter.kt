package network.piction.tracker.api.converters

import network.piction.tracker.common.entities.ContractEntity
import network.piction.tracker.common.repositories.ContractRepository
import org.springframework.core.convert.converter.Converter
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

class IdToContractConverter {

    @Component
    class IdToContentConverter(val contractRepository: ContractRepository) : Converter<Long, ContractEntity> {
        override fun convert(source: Long): ContractEntity? = contractRepository.findByIdOrNull(source)
    }
}