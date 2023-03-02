export class LinkedList {
    // List can be created like so: var list = new LinkedList(["v1", "v2", "v3"]);
    constructor(values) {
        this.head = new Node({value: values[0], next: null});
        var current = this.head;
        for (var i = 1; i < values.length; i++) {
            current.setNext(new Node({value: values[i], next: null}));
            current = current.getNext();
            this.tail = current;
        }
    }

    remove(index) {
        var current = this.head;
        var previous;

        if (index != 0) {
            for (var i = 0; i < index; i++) {
                previous = current;
                current = current.getNext();

                // current is only null if given index is greater than the size of the list. Break out if current is null
                if (!current) {
                    i = index;
                }
            }
            
            // Handle removal of index when index > 0 && index < list.length - 1
            if (current) {
                previous.setNext(current.getNext());

                // Handle resetting tail if index == list.length - 1 (tail)
                if (previous.getNext() == null) {
                    this.tail = previous;
                }
            } else {
                console.log("Index out of bounds. Cannot remove index.");
            }
        } else {
            // Handle removal of index when index == 0 (head)
            this.head = current.getNext();
            current.setNext(null);
        }
    }

    insert(index, value) {
        var current = this.head;
        var previous;

        if (index != 0) {
            for (var i = 0; i < index; i++) {
                previous = current;
                current = current.getNext();

                // current is only null if given index is greater than the size of the list. Break out if current is null
                if (!current) {
                    i = index;
                }
            }
            
            // Handle insertion of index when index > 0 && index < list.length - 1
            if (current) {
                var insertion = new Node({value: value, next: current});
                previous.setNext(insertion);
            } else {
                // Handle resetting tail if index > list.length - 1 (tail)
                var insertion = new Node({value: value, next: null});
                previous.setNext(insertion);
                this.tail = insertion;
            }
        } else {
            // Handle insertion of index when index == 0 (head)
            var insertion = new Node({value: value, next: current});
            this.head = insertion;
        }
    }

    replace(index, value) {
        this.remove(index);
        this.insert(index, value);
    }

    getHead() {
        return this.head.getValue();
    }

    getValue(index) {
        if (index == 0) {
            return this.getHead();
        } else {
            var current = this.head;
            for (var i = 0; i < index; i++) {
                current = current.getNext();

                if (!current) {
                    console.log("Index out of scope. No value to return.");
                    return null;
                }
            }
            return current.getValue();
        }
    }

    getTail() {
        return this.tail.getValue();
    }

    print() {
        var current = this.head;
        var index = 0;

        console.log("_______LinkedList_______\n");
        console.log("[" + index + "]: " + current.getValue());

        index++;
        while (current = current.getNext()) {
            console.log("[" + index + "]: " + current.getValue());
            index++;
        }
        console.log("________________________\n");
    }
}

class Node {
    // Can construct a Nodel like so: var node = new Node({value: "Value", next: new Node({value: "val", next: null})});
    constructor(nodeSettings = {}) {
        this.value = nodeSettings.value;
        if (typeof(nodeSettings.next) === 'object') {
            this.next = nodeSettings.next;
        } else {
            this.next = null;
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    getNext() {
        return this.next;
    }

    setNext(next) {
        this.next = next;
    }

    print() {
        console.log("__________Node__________\n");
        console.log("value: " + this.value);
        console.log("next: " + this.next);
        console.log("________________________\n");
    }
}

/*
[Math Ops] = [+, -, /, *, %]
[Math Assign Ops] = [=, +=, -=, /=, *=, %=]
[Bit Assign Ops] = [&=, |=. ^=. <<=, >>=]
[Bool ops] = [&&, ||, ==, !=, >, <, >=, <=, <=>,!]
[Bitwise Ops] = [&, |, ^, <<, >>]
[Inc/Dec Ops] = [++, --]
[Ptr Ops] = [*, &, new_, delete_]
[Misc Ops] = [::, ?, ",", <<, >>]

    {Left Op} = [null, [Math Ops], [Assign ops], [Bool Ops], [Bitwise Ops], [Inc/Dec ops], [Ptr ops: *, &, new_, delete_,], "::", "?", ","];
    {Right Op} = [null, [Array access: [[UserInput]] ], ".", "->", "++", "--", turnary else: ":", ]

[Extension Block] = {Left Op}[User Input]{Right Op}[Extender]
*/

/* Was used in an attempt to use Regex, but .includes() does what I was trying to do easier than coding it myself
function escapeRegexChars(regexString) {
    var returnString = "";
    for (var i = 0; i < regexString.length; i++) {
        if (regexString[i] == "*" || regexString[i] == "." || regexString[i] == "+" || regexString[i] == "[") {
            returnString += "\\";
        } 
        returnString += regexString[i];
    }
    return returnString;
}
*/


export default LinkedList;