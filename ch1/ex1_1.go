package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	s, sep := "", ""
	fmt.Println("Name of the command: ", os.Args[0])
	for _, args := range os.Args[1:] {
		s += sep + args
		sep = " "
	}
	fmt.Println(s)
	fmt.Println("using package strings:", strings.Join(os.Args[1:], " "))
}
