package main

import (
	"fmt"
	"os"
)

func main(){
	stringVar, sep := "", ""
	for _,arg := range os.Args[1:]{
		stringVar += sep + arg
		sep = " "
	}
	fmt.Println(stringVar)
}

