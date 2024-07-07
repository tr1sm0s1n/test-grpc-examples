from __future__ import print_function

import logging
import sys

import grpc
import greeter_pb2
import greeter_pb2_grpc


def run():
    # NOTE(gRPC Python Team): .close() is possible on a channel and should be
    # used in circumstances in which the with statement does not fit the needs
    # of the code.
    user = "World"
    args = sys.argv
    if len(args) > 1:
        user = args[1]
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = greeter_pb2_grpc.GreeterStub(channel)
        response = stub.Send(greeter_pb2.Request(name=user))
    print("Greeter: " + response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()
