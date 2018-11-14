package main

import (
	"fmt"
	"os"
)

func main() {
	//declare a variable
	var s, sep string
	//use a looping statement
	// initialise    condition        increment statement
	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = " "
	}
	//printing the s variable using fmt package which contains println function
	fmt.Println(s)
}
