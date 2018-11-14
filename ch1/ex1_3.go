package main

import (
	"os"
	"fmt"
	"strings"
)

func main(){
	s, sep := "", ""
	for _, args := range os.Args[1:]{
		s+=sep+args
		sep= " "
	}
	fmt.Println(s)
	fmt.Println(strings.Join(os.Args[1:]," "))
}

