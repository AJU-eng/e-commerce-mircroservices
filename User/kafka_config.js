const {Kafka}=require("kafkajs")

class KafkaConfig{
    constructor()
    {
        this.kafka=new Kafka({
            clientId:"user-service",
            brokers:['localhost:9092']
        })

        this.producer=this.kafka.producer()
        this.consumer=this.kafka.consumer({groupId:'user-group'})
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