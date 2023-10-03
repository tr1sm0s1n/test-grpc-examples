import { dirname } from "path";
import { fileURLToPath } from "url";
import parseArgs from 'minimist';
import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH =  __dirname + '/proto/greeter.proto';

let packageDefinition = loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
let greeter_proto = loadPackageDefinition(packageDefinition).greeter;

(() => {
    let argv = parseArgs(process.argv.slice(2), {
        string: 'target'
    });
    let target;
    if (argv.target) {
        target = argv.target;
    } else {
        target = 'localhost:50051';
    }
    let client = new greeter_proto.Greeter(target,
        credentials.createInsecure());
    let user;
    if (argv._.length > 0) {
        user = argv._[0];
    } else {
        user = 'World';
    }
    client.send({ name: user }, function (err: any, response: any) {
        console.log('Greeting:', response.message);
    });
})();
