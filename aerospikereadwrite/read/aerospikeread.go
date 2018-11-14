package main

import (
	"fmt"
	"strconv"

	aerospike "github.com/aerospike/aerospike-client-go"
)

func fetchRecords(client *aerospike.Client, keys []*aerospike.Key) (records []*aerospike.Record, err error) {
	records, err = client.BatchGet(nil, keys)
	return
}

func AerospikeRead() ([]*aerospike.Record, error) {
	host := "127.0.0.1"
	port := 3000
	namespace := "test" //dbname
	set := "myset1"     //tablename
	client, err := aerospike.NewClient(host, port)
	numberofread := 100
	// numberofgoroutines := 100
	if err != nil {
		fmt.Println("Connection error")
	} else {
		fmt.Println("Connection established")
	}

	size := numberofread
	keys := make([]*aerospike.Key, size)

	for i := 0; i < size; i++ {
		keys[i], _ = aerospike.NewKey(namespace, set, "mykey"+strconv.Itoa(i+1))
	}
	return fetchRecords(client, keys)
}
