package aerospikeWrite

import (

	// "github.com/aerospike/aerospike-client-go"
	"fmt"
	"time"

	aerospike "github.com/aerospike/aerospike-client-go"
)

func AerospikeWrite() {
	client, err := aerospike.NewClient("192.168.168.100", 3000)

	if err != nil {
		fmt.Println("Connection error", err)
	} else {
		fmt.Println("Connection established")
	}

	//Initialize policy
	writePolicy := aerospike.NewWritePolicy(0, 0)
	writePolicy.Timeout = 50 * time.Millisecond
	writePolicy.Expiration = 2

	//Write single value
	key, _ := aerospike.NewKey("test", "myset1", "mykey")

	columnName := "mybin"
	columnValue := "myvalue"

	startTime := time.Now()
	// for i := 1; i < 100; i++ {
	// fmt.Println("Inside for loop")
	bin := aerospike.NewBin(columnName, columnValue)

	client.PutBins(nil, key, bin)
	// }

	endTime := time.Since(startTime)
	//Write multiple values
	// bin1 := aerospike.NewBin("name", "john")
	// bin2 := aerospike.NewBin("age", 25)

	// client.PutBins(policy, key, bin1, bin2)

	//deleting a bin
	// bin = aerospike.NewBin("mybin", nil)
	// value := "newKey"
	// key, _ := aerospike.NewKey("test", "set", value)
	// err = client.PutObject(nil, key, bin)
	// handle error here
	fmt.Println(endTime)

	client.Close()
}
