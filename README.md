# IndependentStudy
A code editor providing a visual aspect to coding rather than allowing a user to code just through keyboard input.

## 3/23/23
This is the end of the branching_point. The editor is now fully capable of creating programs as shown by the files in test_programs.
Is the current editor better than actual programming? I would say not by a long shot. There are plenty of things about this editor that I think results
in an editor that is less productive than normal text editors. There are still many frontend issues like how the editor can't scroll if too many lines
are added to the editor, like how a new line does not focus the newline, like how typing in the middle of a textarea allows moves the caret to the end of the line, 
blocks are not sized properly (nor do they have some kind of scrollbar) so their contents are hard to see, etc., but even if these problems were fixed, I do not believe 
this editor to be more productive. Since the current editor simply stores strings that directly translate to code, I would say that using this VPL editor uses the same 
amount of effort as a normal text editor except that it requires to use the mouse frequently along with keyboard input. To make the VPL editor more productive than
a normal text editor, I think that the VPL should do more than simply translate blocks directly to code. An example would be if one block could generate multiple lines
of code, then perhaps the editor could be more effective; however, I do not have a specific idea in mind right now. Completion of this branch allows me to complete all
of the grade items for my independent study, so I will not be continuing with this style of editor. Rather, for the rest of the semester, I think that I would like
to experiment with the Recoil library for React in order to try and improve upon my current design.

Features implemented this week:
 - added Download functionality: added a download button to the FileWriter that opens the user's file system and allows the user to save the contents of the editor
                                 lines to a file. Was meant to be done synchronously, but that would require learning about "dedicated web workers."
 - added Doxygen comments: added doxygen comments to all functions in order to generate documentation.

## 3/16/23 Edits:
At this point the editor is being made to directly translate blocks representing c++ code to actual c++ statements so that the project can be finished by the end of
the semester. I could continue to take the editor in a direction in which I believe could be beneficial to programming, but that would take more time and effort than
I have in this semester. After finishing what I need in order to get an A for my independent study, I think I will return to the start once again to try and rebuild the
editor using the Recoil library so that components no longer need to worry about sending an update function down through its children to update a hook variable; Recoil can instead provide a sort of "global" state that all components can read and alter without having to send props down through every level. I believe this functionality would be
extremely beneficial and make things a lot easier in the end if I ever continue creating this editor after my independent study is over. Right now, I do not plan to continue
development, but perhaps the Recoil library could change my mind.
</br>
</br>
The changes implemented over the past week are as follows:
 - added Search: a file containing a list of block definitions to represent a variety of c++ functions. Hard coded because I could not think of an efficient way to
                 dynamically create all possible c++ blocks
 - added getBlocks to Search: a method to use the current input and filter from the search bar to only return blocks that meet the search criteria
 - fixed various bugs: I can't remember all of them, but I know of one existing bug. Sometimes typing into a UserInput too quickly can delete the end character and replace it 
                 with the last typed character. I noticed that typing "int" too fast resulted in "it." I believe this behavior to be due to the constant reconstruction of
                 the Workspace component, which must occur every time the blockList is updated. This is one example of what I believe the Recoil library will help with, since
                 providing the Workspace's blockList as an atom will make it so that the Workspace as a whole does not have to be updated every time the blockList is updated.
 - added FileWriter: at this point, I think I know how to write to a file based on what I saw online, but I don't know how to read from a local file. I created FileWriter with
                 the intention of using a UserInput to provide a file name and a button that upon being pressed will write the contents of the editor lines to the file. This is
                 not ideal in the slightest, but I have no other idea of how to read and write to a file since the node:fs module does not work with Vite.

## 3/9/23 Edits:
Blocks can now be properly translated into text in the corresponding line of the text editor. (After reading what I wrote on 3/6/23, it looks like I thought this was the case back then, but it was indeed bugged and needed to be fixed/improved.) The editor still cannot take text from an editor line and use it to edit a block in the BlockZone. I spent a while trying to get this to work (and the pseudocode for this, with two different possible algorithms, is in the Helper.jsx file), but the algorithm is quite complicated. It involves knowing which index in the updated string was updated and which index of the values array of the block was updated, then updating the index of the values array accordingly. This may sound simple, but there are a lot of conditions that need to be checked during the algorithm, and that makes it hard to implement. I chose to wait on implementing the algorithm until I figure out how my blocks will translate into code. Right now I have it so that my blocks are one-to-one with the lines of the text editor, but depending on how I implement the blocks, it could be a one-to-many situation. For example, if I create a set block to perform the action "set variable = value;" then I could translate that to "int variable; variable = value;" if that's how I choose to implement the blocks.
</br>
</br>
Other than the translations, I added the ability to click on a block in the DragZone and replace the corresponding line of the BlockZone with the selected block. Drag and drop would've been much more complicated to implement as the UserInputs within the BlockZone would've had to use an allowDrop function (to use event.preventDefault() on dragover to ensure the block can be dropped) and an onDrop function to return the index of the BlockZone's blockList to replace with the selected block. I saw this as redundant since the Workspace is already aware of which line is in focus using its own index hook variable, so I simply made it so that onMouseDown selects the block from the DragZone and onFocus sets the corresponding index of the BlockZone's blockList, which updates the Workspace's index -- and through useEffect() -- updates main's blockZoneSelected. If BlockZone's blockList is called bzValues, clicking on a block in the dragZone updates bzValues[blockZoneSelected] to that selected block.
</br>
</br>
The list of blocks shown in the dragZone is currently controlled by a list of blockLists called SearchBlocks. The idea of SearchBlocks is that each blockList in SearchBlocks contains a specific "type" of block. When a UserInput is typed into, a variable called input is updated in main. The purpose of input is to determine which blocks to display in the dragZone's blockList. Giving SearchBlocks "types" can allow for a comparison with input to filter out blocks that the user may not need. Furthermore, the search bar in the dragZone is also meant to be used for filtering blocks in the dragZone blockList. If input filters which blockList in SearchBlocks is used, the search bar will further filter results by selecting which blocks in that blockList will be shown in the dragZone's blockList.
</br>

## 3/6/23 Edits:
I was finally able to implement the BlockZone's blockList. The blockList can contain both Blocks and UserInputs. Typing in a UserInput in the BlockZone will edit the same corresponding line in the text editor. This capability is not ready to be implemented into blocks yet as blocks hold an array of strings while the text editor holds one single string, so something needs to be done in order to make sure the blocks can be translated from/to easily. The main problem with implementing the blockList and ensuring it was directly tied to the editor was how to manage the storage of data. The data could not be stored within the BlockZone or Editor directly because the two components need to know about each other's data so that one may update the other. Thinking back on it now, I'm not entirely sure if there was a reason why the blockList couldn't be a hook variable within the Workspace, but I know the blockList will eventually be needed in main because the dragzone will eventually need to know about the blockList in order to update it. I was able to make my approach work after a long struggle of figuring out how to design things. After running into an issue where my blockList was updating correctly but the values displayed in my UserInputs were not, I thought about reading from/writing to files only to learn that the node:fs module cannot be used with Vite. (Reading and writing to files will eventually be needed since the goal is to create and store a program made with this editor, but I have yet to learn how to do so.) As I discovered today, the reason why my UserInputs (textareas) were not updating correctly was because I was setting their defaultValue instead of their value. The behavior this caused in my program is still strange and confusing to me; nevertheless, this simple -- yet hard to find fix -- fixed my components so that they could update correctly.

## 3/1/23 Edits: 
Design is currently on attempt 4. Attempt 3 sought ease of use of React components by separating their data from their view through Controller classes. I ran into a wall when figuring out how to update both the BlockZone and Editor with this design model. All blocks in the BlockZone have a string representation (a value), and the lines of the editor are meant to be 1 to 1 with the value of each block in the BlockZone. As such, when the value of a block in the BlockZone is updated, the value of the lines in the Editor should match; however, with separate Controller objects for the BlockZone and Editor, I could not get this functionality to work due to the fact that changing the data stored in an object does not trigger React's update functionality since a plain JS object is not a React Component. Seeing no way to make this functionality possible with design attempt 3, I tested design attempt 4. I tried to hold onto the idea of controllers with design attempt 4, but they were really just performing the same function as the actual component (since the controllers were React Components as well) so I just got rid of them. I was able to figure out that with all objects being React Components (this time made using hooks instead of classes) that I needed the BlockZone and Editor to share the same state, so I made them both hooks within a Workspace Component. This provided me with the functionality I was seeking (being able to update the Editor with an update to the Blocks in the BlockZone), but a new problem arised: how to add new blocks to the list of blocks in the BlockZone. I want to be able to add a block when the user presses enter within the textarea of a block in the blockzone, but the problem is that my list of blocks is in my Workspace Component, and the textarea is within the UserInput Component that is within the Block Component that is in a list within the Workspace Component.
</br>
</br> Visually: Workspace: blocks = \[Block\] -> UserInput -> textarea
</br>
</br> So how is an enter key press within the textarea supposed to append a block to "blocks" all the way up in the Workspace Component? Especially since I can't pass the list of blocks to each Block in the list, so I can't send the list of blocks themselves down the hierarchy. Hmm... 

## 2/16/23 Edits:
Created the code for the interface after following the pseudocode. Some of the pseudocode could not be implemented as intended, and for some of the code, the way the code works is undesirable. For example, the BlockZone uses a LinkedList of UserInputs to create the textareas for blocks to be placed within the BlockZone. Pressing enter appends a new line to the end of the linked list no matter what line is currently selected. An approach is currently being thought of to fix this behavior, with the desired behavior being a new line being inserted immediately after the selected line (ex. if the user is currently on line 2 and the user presses enter, a new line should be inserted between lines 2 and 3, with the new line number being updated to 3 and all subsequent lines having their line numbers updated respectively.

## 2/15/23 Edits:
The repository now contains a pseudocode design for the interface via src/mainPsuedo.txt, src/BlockPsuedo.txt, src/BlockZonePseudo.txt, and src/DragZonePsuedo.txt. blockVisualization.cpp shows the original thought process of how the blocks will work by showing comments for respective c++ statements; however, a new approach to creating the blocks has made the old thought process obsolete. "Dividers" will no longer used: blocks will consist of UserInput (textareas) and Extenders (textareas). UserInput textareas provide an area to place "terminal_blocks" that can be dragged from the dragzone and placed within the block. The terminal_block is "absorbed" by the parent block as the parent block appends the html elements. Extender textareas also provide an area to place terminal_blocks, but upon placing a terminal_block within the Extender (or providing the Extender with text input), a new Extender will be appended to the block to allow the block to represent a programming statement of variable length; the statement will only end when an end_statement block is placed into the Extender. For example, in C++, this end_statement block will be a semicolon. The hope with this design is that any programming statement can be created with an initial block containing a UserInput textarea and Extender textarea, given that the DragZone provides the terminal_blocks to use. The DragZone will contain many predefined blocks to choose from, along with a textarea used to search for the exact block to use (also containing filters to help aid the search). There will also be blocks generated from the program, too, such as variable blocks and functions. Ultimately the usefulness of this interface will be dependent on how helpful the DragZone is when searching for blocks.


An example using C++:
- Start: [UserInput] [Extender]  // Format of the initial block
  - int* [UserInput] [Extender]  // The user places an [int* [UserInput]] terminal block into [UserInput]
  - int* variable [Extender]  // The user types the name "variable" into [UserInput]
  - int* variable = &[UserInput] [Extender]  // The user used an [= &[UserInput] [Extender]] block
  - int* variable = &var2 [Extender]  // The user types var2 for the second variable name
  - int* variable = &var2;  // The user ends the statement using the end_statement block.

## 2/10/23 Edits:
The repository now contains the code I have created for the interface so far (not all of it, my previous attempt at using electron has not been uploaded). The repositor now contains the TestApp directory. This is the directory I will be using to build the application (I have yet to come up with a name for the application, so I will refer to it as the Visual Text Editor (VTE)). All testing will be done in the TestApp directory. When the final version of the VTE is ready to be created, I will create a directory specifically for the final version.

### TestApp Directory (2/10/23):
- block.css: style definitions for div classes representing blocks. This was created earlier on and is not up to date.

- blockspace.html: a separate html file that may be used to implement the BlockSpace as an iframe in index.html. 
                   The only benefit I believe this would 
                   provide is the ability to behave like its own webpage within another webpage (The advantage 
                   being a scrollbar: if so many blocks are added that the blocks go off the screen, then the 
                   page automatically reacts by adding a scrollbar so that all elements can be viewed.). 
                   The disadvantage of using iframes is that I do not know if this will complicate the transfer 
                   of data from one view to another. For example, if the sidebar (the DragZone) and the BlockArea
                   are both iframes, then how will drag and drop be affected by the two views being iframes? Will
                   it even have an effect? This is something I have not tested, so I am unsure if this is anything
                   to be concerned about or not. At this point, I have no plans to use iframes, so this file is 
                   useless at the moment.
                   
- index.html: the main html file that controls the view. Bootstrap is also added to apply styles to elements 
              easily through classes.
              
- package-lock.json: I believe this file is created after npm install is used to install a package. 
                    Not entirely sure of its use.
                    
- package.json: metadata about project, such as author, license, and commands used by vite for development such 
                as a command to run the application.
                
- sidebar.html: a separate html file meant to be used in the same way as blockspace.html, this time for the 
                sidebar where blocks are dragged from. (So far, unused since I don't know if iframes will be used.)
                
- vite.config.js: a config file for vite.

- src:
  - Block.jsx: a file defining React components used for Blocks. The plan is to have a Block class and have each 
               type of block extend the Block class.
               
  - BlockZone.jsx: the BlockZone is the area where blocks will be combined together to represent code. The base 
                   of the BlockZone is a text editor where the root line of the text editor is a React component.
                   The root line cannot disappear and is the holder that keeps following lines in place.
                   New lines are added to the text editor by adding React components to the root line as children. 
                   Currently, the root line stores a list of all NewLine children. A new line is added to the root 
                   line's list of NewLine children when an enter is pressed while typing within a NewLine's 
                   textarea. Textareas, a React component called CreateForm, is a form containing a textarea with 
                   the ability to add NewLines. There is currently no capability to remove NewLines by pressing 
                   backspace on an empty line because the process of creating NewLines can be improved. A divider 
                   is a component used within a block, such that a block is created from dividers and textareas (a 
                   divider simply stores a \<p> containing text). A DropZone is my attempt at creating an area for 
                   blocks to be dropped and shown on a NewLine. A DropZone currently adds the inner components of 
                   a Block and not the Block itself; thus, Blocks can only be dropped into the droparea and cannot 
                   be removed.
  
  - DragZone.jsx: this is the area that should probably be called the sidebar. This is the area where blocks are 
                  supposed to appear after the user types in the BlockZone's current line. Blocks will appear and
                  the user can drag them from the DragZone to the BlockArea.
  
  - main.jsx: at the moment, creates the Monaco editor and initializes the root line of the BlockArea and DragZone.
              In the future, will most likely control communication between BlockArea and DragZone components (if
              necessary) and communication of block data to the Monaco editor and vice versa.
