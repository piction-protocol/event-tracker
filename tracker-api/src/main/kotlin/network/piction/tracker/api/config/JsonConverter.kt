package network.piction.tracker.api.config

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider
import org.springframework.boot.jackson.JsonComponent
import java.io.IOException
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

@JsonComponent
class JsonConverter {
    class LocalDateTimeJsonSerializer : JsonSerializer<LocalDateTime>() {
        @Throws(IOException::class)
        override fun serialize(localDateTime: LocalDateTime, jsonGenerator: JsonGenerator, serializerProvider: SerializerProvider) {
            val out = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant())
            jsonGenerator.writeNumber(out.time)
        }
    }

    class LocalDateTimeJsonDeserializer : JsonDeserializer<LocalDateTime>() {
        @Throws(IOException::class)
        override fun deserialize(jsonParser: JsonParser, deserializationContext: DeserializationContext): LocalDateTime {
            val `in` = Date(jsonParser.valueAsLong)
            return LocalDateTime.ofInstant(`in`.toInstant(), ZoneId.systemDefault())
        }
    }
}
