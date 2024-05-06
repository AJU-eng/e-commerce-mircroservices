const grpc=require("@grpc/grpc-js")
var protoLoader=require("@grpc/proto-loader")
const { options } = require("./router/router")
const PROTO_PATH="../proto/user.proto"

const objects={
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true
}

var packageDefinition=protoLoader.loadSync(PROTO_PATH,options);

const useService=grpc.loadPackageDefinition(packageDefinition).userService;

const client= new useService("localhost:50051",grpc.credentials.createInsecure())




module.exports=client