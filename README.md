# IndependentStudy
A code editor providing a visual aspect to coding rather than allowing a user to code just through keyboard input.

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
