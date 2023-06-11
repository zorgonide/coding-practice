// BST

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}
class BST {
  constructor() {
    this.root = null;
  }
  height(node = this.root) {
    if (!node) {
      return -1;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
  add(val) {
    if (!this.root) {
      this.root = new Node(val);
    } else {
      let current = this.root;
      while (1) {
        if (val < current.value) {
          if (current.left) current = current.left;
          else {
            current.left = new Node(val);
            break;
          }
        }
        if (val > current.value) {
          if (current.right) current = current.right;
          else {
            current.right = new Node(val);
            break;
          }
        }
      }
    }
    return this;
  }
  toObject() {
    return this.root;
  }
  printBST(node, prefix = '', isLeft = true) {
    if (node !== null) {
      console.log(prefix + (isLeft ? '├──' : '└──') + node.value);
      const indent = prefix + (isLeft ? '│  ' : '   ');
      this.printBST(node.left, indent, true);
      this.printBST(node.right, indent, false);
    }
  }
}
console.log('-----BST Start-------');
let tree = new BST();
tree.add(50);
tree.add(30);
tree.add(70);
tree.add(20);
tree.add(40);
tree.add(60);
tree.add(80);

// Print the BST
tree.printBST(tree.root);

// Test the height method
console.log('Height of the BST:', tree.height()); // Should print: 2

// Test the toObject method
console.log('BST as an object:', tree.toObject()); // Should print: { value: 50, left: TreeNode, right: TreeNode }

// Add more nodes to the BST
tree.add(55);
tree.add(75);

// Print the updated BST
tree.printBST(tree.root);

// Test the height method again
console.log('Updated height of the BST:', tree.height()); // Should print: 3

// Test the toObject method again
console.log('Updated BST as an object:', tree.toObject()); // Should print: { value: 50, left: TreeNode, right: TreeNode }
console.log('-----BST End-------');

/**
 * Here's how height code works:

It takes in a node as an argument, which represents the root of the subtree for which we want to calculate the height.

If the node is null or undefined (i.e., if there is no subtree), then the function returns -1, which represents the height of an empty tree.

If the node is not null, then the function recursively calculates the height of the left and right subtrees by calling itself with the left and right child nodes of the current node, respectively.

The height of a subtree is defined as the maximum height of its left and right subtrees, plus one (to account for the current node). This is what the code is doing with the Math.max() and +1 operations.

Finally, the function returns the computed height of the entire subtree rooted at the given node.
 * 
 */
