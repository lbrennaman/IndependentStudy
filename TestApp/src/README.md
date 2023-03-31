# VPL Editor Independent Study
 - by Logan Brennaman
 - Spring Semester 2023
<hr>

## What is this project?
A visual programming language (VPL) is a method of programming through the use of visual elements displayed on a computer.
This project creates a VPL text editor that allows a user to code using visual "blocks." Blocks represent the code of a 
chosen programming language (in the current implementation, this language is C++), and the purpose of these blocks is to 
simplify the process of writing code by providing a tool used to abstract details -- details that inhibit a user's ability
to code -- from the user. One such detail that is abstracted from the user is syntax. 


The blocks do not represent an entire line of code as some pieces of code require user input, such as variable names. 
As such, the blocks are meant to represent the pieces of code that do not require user input, such as the function main()
in C or C++. The main() function is always written as 

 - "int main([UserInput]) {" 

where the [UserInput] is the area of the line of code that requires a user's input. A "main block" would be one that represents the 

 - "int main(" and ") {" 

parts of the line so that the user does not have to input them, leaving the user to only have to type what they need to for the 
[UserInput] part of the line. If the desired definition of main() is to write 

 - "int main(int argc, string[] argv) {" 

then all syntax can be abstracted from the user by providing the user with a block that represents 

 - "int main(int [UserInput], string[], [UserInput]) {" 
 
thus, leaving only the need to enter variable names into the [UserInput] areas. This approach can completely abstract the need for 
a user to know a language's syntax because the block would know the syntax for the user. The most difficult challenge in creating 
such an editor is the idea of how to style the frontend in a way that not only provides the desired functionality but whose
ease of use provides more productivity than classical programming.

## Files
 - Block.jsx: defines the React component for a Block
 - DragZone.jsx: defines the DragZone React component that is used to store a list of Blocks the user can use
 - FileWriter.jsx: defines the FileWriter React component that handles writing to the user's file system
 - Helper.jsx: defines the helper functions used by the various other React components in this project
 - main.jsx: defines the MainView React component that manages the transfer of data from one subcomponent to another
 - Search.jsx: defines the representation of Blocks and provides a method to get a list of Blocks depending on the given parameters
 - UserInput.jsx: defines the React component for an input area that the user is allowed to type in
 - Workspace.jsx: defines a React component that creates an area to place blocks and a text editor to show what the blocks translate to