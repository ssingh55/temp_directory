package aeroBenchMark

import (
	"fmt"
	"runtime"
)

func UserConfig() (numberOfCPU int, host string, port int, namespace string, set string, numberOfGoroutine int, numberOfReads int, numberOfWrites int) {
	fmt.Print("Enter number of cpu to use: ")
	fmt.Scanln(&numberOfCPU)
	CPUcapacity := runtime.NumCPU()
	if CPUcapacity < numberOfCPU || numberOfCPU < 1 {
		numberOfCPU = CPUcapacity
	}
	fmt.Print("Enter the host: ")
	fmt.Scanln(&host)
	host = "localhost"
	fmt.Print("Enter the port: ")
	fmt.Scanln(&port)
	port = 3000
	fmt.Print("Enter the namespace: ")
	fmt.Scanln(&namespace)
	namespace = "test"
	fmt.Print("Enter the test set: ")
	fmt.Scanln(&set)
	set = "testset"
	fmt.Print("Enter number of goroutines (default 32): ")
	fmt.Scanln(&numberOfGoroutine)
	numberOfGoroutine = 32
	fmt.Print("Enter number of reads: ")
	fmt.Scanln(&numberOfReads)
	numberOfReads = 1000
	fmt.Print("Enter number of writes: ")
	fmt.Scanln(&numberOfWrites)
	numberOfWrites = 1000
	return
}
