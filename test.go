package main

import "fmt"

func penjumlahan(a, b int) int {
	return a + b
}

func pengurangan(a, b int) int {
	return a - b
}

func perkalian(a, b int) int {
	return a * b
}

func pembagian(a, b int) int {
	return a / b
}

func main() {
	var a, b int
	fmt.Println("Masukkan Nilai A:")
	fmt.Scan(&a)
	fmt.Println("Masukkan Nilai B:")
	fmt.Scan(&b)

	fmt.Println("Pilih operasi:")
	fmt.Println("1. Penjumlahan")
	fmt.Println("2. Pengurangan")
	fmt.Println("3. Perkalian")
	fmt.Println("4. Pembagian")

	var choice int
	fmt.Scan(&choice)

	switch choice {
	case 1:
		fmt.Println("Hasil Penjumlahan:", penjumlahan(a, b))
	case 2:
		fmt.Println("Hasil Pengurangan:", pengurangan(a, b))
	case 3:
		fmt.Println("Hasil Perkalian:", perkalian(a, b))
	case 4:
		if b != 0 {
			fmt.Println("Hasil Pembagian:", pembagian(a, b))
		}else{
			fmt.Println("Angka Kedua nya jangan nol")
			return
		}
		
	default:
		fmt.Println("Pilihan tidak valid")
	}
}
