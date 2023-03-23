#include<iostream>

using namespace std;

int main(void) {
	int array[5] = {5, 6, 7, 8, 9} ;
	for (int i = 0; i < sizeof(array) / sizeof(int); i++) {
		cout << "Array[" << i << "]: " << array[i] << endl;
	}
}
