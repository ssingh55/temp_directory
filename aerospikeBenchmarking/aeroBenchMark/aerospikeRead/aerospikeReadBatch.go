package aerospikeRead

import (
	"fmt"
	"strconv"

	aerospike "github.com/aerospike/aerospike-client-go"
)

func AerospikeReadBatch() {
	host := "127.0.0.1"
	port := 3000
	client, err := aerospike.NewClient(host, port)
	// fmt.Println(client.IsConnected())
	if err != nil {
		fmt.Println("Connection error")
	} else {
		fmt.Println("Connection established")
	}

	size := 100
	keys := make([]*aerospike.Key, size)

	for i := 0; i < size; i++ {
		keys[i], _ = aerospike.NewKey("test", "myset1", "mykey"+strconv.Itoa(i+1))
	}

	records, err := client.BatchGet(nil, keys)
	fmt.Println(records)
}
