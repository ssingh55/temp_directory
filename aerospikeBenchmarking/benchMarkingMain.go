package main

import (
	"aerospikeBenchmarking/aeroBenchMark"
	"fmt"
	"time"
)

func main() {
	numberOfCPU, host, port, namespace, set, numberOfGoroutine, numberOfReads, numberOfWrites := aeroBenchMark.UserConfig()
	startTime := time.Now()
	fmt.Println(numberOfCPU, host, port, namespace, set, numberOfGoroutine, numberOfReads, numberOfWrites)
	endTime := time.Since(startTime)
	fmt.Println("time taken for execution : ", endTime)
}
