#include<cstdlib>
#include<cmath>
#include<iostream>
#include<string>

using namespace std;

int main(void) {
	int money;
	int quarters = 0;

	// Get the amount of money from the user
	cout << "Input money: $";
	cin >> money;
	money *= 100;

	// Get the number of coins that equal the amount of money
	while ((money - 25) >= 0) {
		money -= 25;
		quarters += 1;
	}

	// Display the number of quarters
	cout << "Quarters: " << quarters << endl;
}
