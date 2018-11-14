package main

import "fmt"

func sumOfFirstNNaturalNumber(n int)(int){
	sum := 0
	for i:=0; i<n;i++{
		sum +=i
	}
	return sum
}

func main(){
	fmt.Println(sumOfFirstNNaturalNumber(5))
}
