class BinaryTree {
    constructor(treeSettings = {}) {
        if (typeof(treeSettings.root) === 'object') {
            this.root = treeSettings.root;
        } else {
            this.root = new TreeNode({ value: treeSettings.root });
        }

        this.current = this.root;
    }

    getValue() {
        return this.current.value;
    }

    setValue(value) {
        this.current.setValue(value);
    }

    getCurrent() {
        return this.current;
    }

    /* Pre-order
    setCurrent(node, count, index) {
        var temp = node;

        if (count == index) {
            this.current = temp;
        }

        if (temp.left && count < index) {
            count = this.setCurrent(temp.left, ++count, index);
        }

        if (temp.right && count < index) {
            count = this.setCurrent(temp.right, ++count, index);
        }

        return count;
    }
    */

    setCurrent(index) {
        this.current = this.root;
        this.setCurrentRecursion(this.current, index, 0);
    }

    setCurrentRecursion(node, index, count) {
        if (count == index) {
            this.current = node;
        }

        if (node.left && count < index) {
            this.setCurrentRecursion(node.left, index, (2 * count + 1));
        }

        if (node.right && count < index) {
            this.setCurrentRecursion(node.right, index, (2 * count + 2));
        }
    }

    getLeft() {
        return this.current.left;
    }

    setLeft(value) {
        this.current.setLeft(value);
    }

    getRight() {
        return this.current.right;
    }

    setRight(value) {
        this.current.setRight(value);
    }

    print() {
        this.root.print();
    }
}

class TreeNode {
    constructor(treeNodeSettings = {}) {
        if (treeNodeSettings.value != null) {
            this.value = treeNodeSettings.value;
        } else {
            this.value = null;
        }

        if (typeof(treeNodeSettings.left) === 'object') {
            this.left = treeNodeSettings.left;
        } else {
            if (treeNodeSettings.left != null) {
                this.left = new TreeNode({ value: treeNodeSettings.left });
            } else {
                this.left = null;
            }
        }

        if (typeof(treeNodeSettings.right) === 'object') {
            this.right = treeNodeSettings.right;
        } else {
            if (treeNodeSettings.right != null) {
                this.right = new TreeNode({ value: treeNodeSettings.right });
            }
            else {
                this.right = null;
            }
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    getLeft() {
        return this.left;
    }

    setLeft(value) {
        this.left = new TreeNode({value: value});
    }

    getRight() {
        return this.right;
    }

    setRight(value) {
        this.right = new TreeNode({value: value});
    }

    print() {
        console.log("   Value: " + this.value);
        console.log("\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/");
        console.log("\nLeft: \n", this.left);
        console.log("\nRight: \n", this.right);
        console.log("\n^^^^^^^^^^^^^^^^^^^^^^^");
    }
}

var left = new TreeNode({value: " = "});
var right = new TreeNode({value: " . "});
var node = new TreeNode({value: "V", left: left, right: right});

node.print();

node.setValue("New value");
node.setLeft(" += ");
node.setRight(" [] ");

node.print(); 

var tree = new BinaryTree({root: node});
tree.print();

console.log("Current/Root:\n", tree.getCurrent(), '\n');

tree.setCurrent(2);

console.log("Updated current: ", tree.getCurrent());

tree.setValue("New value for node index 2 (root right)");
var newLeft = new TreeNode({value: "subLeft"})
var newRight = new TreeNode({value: "subRight"})
tree.setLeft(newLeft);
tree.setRight(newRight);

console.log("\nPrinting new tree: ---------------------------\n");
tree.print();

tree.setCurrent(5);
console.log("Index 5: ", tree.getCurrent());