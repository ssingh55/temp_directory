package main

import (
	"fmt"
	"time"
)

func main() {
	startTime := time.Now()
	str, err := AerospikeRead()
	endTime := time.Since(startTime)
	fmt.Println("time taken for execution : ", endTime, str)
}
