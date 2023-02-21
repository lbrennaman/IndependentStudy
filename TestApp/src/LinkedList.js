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

var math_ops = [" + ", " - ", " / ", " * ", " % "];
var math_assign_ops = [" = ", " += ", " -= ", " /= ", " *= ", " %= "];
var bit_assign_ops = [" &= ", " |=", " ^= ", " <<= ", " >>= "];
var bool_ops = [" && ", " || ", " == ", " != ", " > ", " < ", " >= ", " <= ", " <=> ", " !"];
var bitwise_ops = [" & ", " | ", " ^ ", " << ", " >> "];
var inc_dec_ops = [" ++", " --"];
var ptr_ops = [" *", " &", "new ", "delete "];
var misc_ops = ["::", " ? ", ", ", " << ", " >> "];

var left_ops = ["", math_ops, math_assign_ops, bool_ops, bitwise_ops, inc_dec_ops, ptr_ops, misc_ops];
var right_ops = ["", "[ [input] ]", ".", "->", "++ ", "-- ", " : "];

var number_of_left_ops = (1 + math_ops.length + math_assign_ops.length + bool_ops.length + bitwise_ops.length + inc_dec_ops.length + ptr_ops.length + misc_ops.length);
var number_of_right_ops = right_ops.length;

var total_variations = number_of_left_ops * number_of_right_ops;

function listAllRightOps(leftBlock, rightCondition) {
    if (leftBlock.length == 0) {
        return "";
    }

    var list = [];
    for (var i = 0; i < right_ops.length; i++) {
        if (right_ops[i] != " : " && right_ops[i] == rightCondition) {
            list.push(leftBlock + right_ops[i] + "[Extender]");
        } else {
            if (leftBlock[1] == "?" && right_ops[i] == rightCondition) {
                list.push(leftBlock + right_ops[i] + "[Extender]");
            }
        }
    }
    return list;
}

// Code to build all possible extension blocks
function getBlockList(leftCondition, rightCondition) {
    var blockList = [];
    for (var i = 0; i < number_of_left_ops; i++) {
        var block = "";

        // Add left operator to block
        if (i == 0) {
            if (left_ops[0] == leftCondition) {
                block += "";
                block += "[UserInput]";
            }
        } else if (i >= 1 && i <= 5) {
            if (left_ops[1][i - 1] == leftCondition) {
                block += left_ops[1][i - 1];
                block += "[UserInput]";
            }
        } else if (i >= 6 && i <= 11) {
            if (left_ops[2][i - 6] == leftCondition) {
                block += left_ops[2][i - 6];
                block += "[UserInput]";
            }
        } else if (i >= 12 && i <= 21) {
            if (left_ops[3][i - 12] == leftCondition) {
                block += left_ops[3][i - 12];
                block += "[UserInput]";
            }
        } else if (i >= 22 && i <= 26) {
            if (left_ops[4][i - 22] == leftCondition) {
                block += left_ops[4][i - 22];
                block += "[UserInput]";
            }
        } else if (i >= 27 && i <= 28) {
            if (left_ops[5][i - 27] == leftCondition) {
                block += left_ops[5][i - 27];
                block += "[UserInput]";
            }
        } else if (i >= 29 && i <= 32) {
            if (left_ops[6][i - 29] == leftCondition) {
                block += left_ops[6][i - 29];
                block += "[UserInput]";
            }
        } else {
            if (left_ops[7][i - 33] == leftCondition) {
                block += left_ops[7][i - 33];
                block += "[UserInput]";
            }
        }

        console.log(block);

        // Use listAllRightOps to get the BlockList
        blockList += listAllRightOps(block, rightCondition);

    }

    return blockList;
}

console.log(getBlockList(" = ", ""));

export default LinkedList;