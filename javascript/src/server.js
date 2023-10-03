import { dirname } from "path";
import { fileURLToPath } from "url";
import { loadPackageDefinition, Server, ServerCredentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = __dirname + '/proto/greeter.proto';

const packageDefinition = loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const greeter_proto = loadPackageDefinition(packageDefinition).greeter;

function sendMessage(call, callback) {
  console.log(`${call.request.name} has called`);
  callback(null, { message: 'Hello ' + call.request.name });
}

(() => {
  const server = new Server();
  server.addService(greeter_proto.Greeter.service, { Send: sendMessage });
  server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server listening on port 50051...');
  })
})();
