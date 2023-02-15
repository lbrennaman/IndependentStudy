// If the line begins with #include, then two options: #include<___> or #include"___"
#include <iostream>     // Block --> #include <_________> | library = ____, statement = "#include <" + library + ">", line 2, indentation 0

using namespace std;    // --> using namespace _____; | namespace = ____, statement = "using namespace " + namespace + ";" , line 4, indentation 0

// Drop down menu: \/
// Extender: + 
// One possible function prototype
int len(string);        // --> int\/ ___(___+); | name = ___, parameters = \/___+, statement = "int " + name "(" + parameters + ");" line 9, indentation 0

// If function prototype has more than one parameter, then commas are stored in the parameters string: parameters = \/___,\/___+
// Types of extenders for function prototypes: can only add more parameters, so add a \/___ and allow the extender to be used again

// Actual defined function: knows that it is not a prototype because it is followed by "{" (must also check next line for "{")
// \/ ____(\/___, \/___+) {body} | name = ___, parameters = \/___, \/___+, statement = "void " + name + "(" + parameters + ") {" [body] }
void print(string a, string b) {
    cout << a << " " << b << endl;
}

// Blocks with bodies are unaware of their inside statements
// --> class ______ {body};
class Object { // indentation 0

    // Bodies must recognize indentation and line number. If lineNumber is between Object's beginning and end, indentation = Parent's indentation + 1
    public: // indentation 1
        Object(); // Indentation = Parent's indentation + 1 => indentation 2
        int method(); // Indentation = Parent's + 1         => indentation 2
};

// Templates could be functions or classes, so include a dropdown to select either a type or a class
// --> template<\/___+> \/ ___ {body} (if class, then end with semicolon)
template<class T> class tempObject {
    public:
        tempObject(T);
};

// --> int main(___+) {body}
int main(void) {

    // Assignment blocks
    // \/ ___+      Extender can be ";" or =___+, where the second (recursive) extender can be a mathematical operator, boolean operator, or "." to call a method
    // Ideally the code should be smart enough to recognize whether or not the variable on the right hand side of the equals sign is an object or not.
    string str;

    // \/* ______+ or \/ ________+ is this a normal assignment block?
    // If so, extender must account for new ___[___];
    // int* integer = new int[5];

    // \/ ___ = ___;
    string otherStr = "string2";

    // cout << ___+     Extender: "<< ___+" or "<< endl+" or ";"
    cout << "Enter a string: ";

    // cin >> ___;
    cin >> str;

    // cout << (string1 + string2 == string3) < 1 << endl;

    // Drop downs can be left blank, like the following for loop:
    // for (\/ ___+) {body}
    // This way for loops can also be transormed into foreach loops
    for (int i = 0; i < len(str); i++) {
        // if (___+) {body}+    Second extender is recursive if "elseif" is selected, the end of recursion is the "else" statement
        if (i != len(str) - 1) 
            cout << str[i] << " ";
        else
            cout << str[i];
    }
    cout << endl;

    // Test
    int jojo = 6;
    cout << "JOJO: " << (jojo += 7) << " AND " << (jojo++ && 13) << endl;

    // Test
    /*  for (assignment; condition; assignment)
    for (int z = 5; z < 10; z = z + 2) { 
        cout << "Z WORKS: " << z << endl;
    }
    */

    if (len(str) > 5) {
        cout << "String is greater than length 5." << endl;
    }

    // A function call block: _____(____+);
    print("string1", otherStr);

    Object object = Object();
    tempObject<Object> temp(object);

}

int len(string str) {
    int count = 0;
    for (char s: str) {
        count++;
    }
    return count;
}

// Should the following three statements be 1, 2, or 3 blocks?
// \/::___(\/___+) {body}           First drop down selects class
// \/ \/::(\/___+) {body}           First drop down selects type, second selects object
// \/ \/ \/::___(\/___+) {body}     or  template<\/___+> \/<___+>::___(\/___)
Object::Object() {
    cout << "Instantiated object" << endl;
}

int Object::method() {
    return 5;
}

template<class T> tempObject<T>::tempObject(T object) {
    cout << object.method() << endl;
}