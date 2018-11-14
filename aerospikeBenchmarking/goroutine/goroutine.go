package goroutine

import (
	"fmt"
)

func Routine() {
	fmt.Println("This will happen first")

	go func() {
		fmt.Println("this will happen at some time")
	}()

	fmt.Println("This will happen second or third")

	fmt.Scanln()
	fmt.Println("done")
}
