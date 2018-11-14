package main

import "fmt"

func fibonacci() func() int{
	n := 0
	a := 0
	b := 1
	c := a+b
	return func() int{
		var retValue int
		switch (n) {
			case 0:
				n++
				retValue = 0
			case 1:
				n++
				retValue = 1
			default:
				retValue = c
				a = b
				b = c
				c = a+b
		}
		return retValue
	}
}

func main(){
	f := fibonacci()
	for i :=0 ; i< 10 ; i++{
		fmt.Println(f())
	}
}
