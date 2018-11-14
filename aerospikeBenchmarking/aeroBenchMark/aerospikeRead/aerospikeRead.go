package aerospikeRead

import (
	"fmt"

	aerospike "github.com/aerospike/aerospike-client-go"
)

func AerospikeRead() {
	client, err := aerospike.NewClient("127.0.0.1", 3000)

	if err != nil {
		fmt.Println("Connection error")
	} else {
		fmt.Println("Connection established")
	}
	key, _ := aerospike.NewKey("test", "myset1", "mykey3")
	record, err := client.Get(nil, key)
	fmt.Println(record.Bins)
}
