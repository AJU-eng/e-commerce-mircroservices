const {Kafka}=require("kafkajs")

class KafkaConfig{
    constructor()
    {
        this.kafka=new Kafka({
            clientId:"order-service",
            brokers:['localhost:9092']
        })

        this.producer=this.kafka.producer()
        this.consumer=this.kafka.consumer({groupId:'order-group'})
    }
    
    async produce(topic,message){
        try {
            await this.producer.connect()
            await this.producer.send({
                topic:topic,
                messages:message
            })
        } catch (error) {
            console.log(error);
        }finally{
            await this.producer.disconnect()
        }
    }

    async consume(topic,callback){
        try {
            
           await this.consumer.connect()
           await this.consumer.subscribe({topic:topic,fromBeginning:true})
           await this.consumer.run({
            eachMessage:async({topic,partition,message})=>{
                const value=message.value.toString()
                callback(value)
            }
           })
            

        } catch (error) {
            console.log(error);
        }
    }

}


module.exports=KafkaConfig