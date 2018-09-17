
# TTRC WIN - Step-by-Step TTRC Dev Setup and build & RC build Known Issues and Fixes
TeamTrials Rocket.Chat Work Instruction Note (WIN) 
TT Part 11 Compliance Context:  Software Development and Configuration Control Processes, KT, Training Materials
Document Control:  WIN documents are uncontrolled, are developed by and for the individuals executing the processes  


## SCOPE of this WIN: 
- Step by Step walk-through to setup a TT Rocket.Chat Development Environment on a new to Meteor Windows 10 or Linux machine. 
- Instruction to initiate the complie and build of RC
- RC Install, Compile & Build  - KNOWN ISSUES and FIXes for COMMON PROBLEMS

# Step-by-Step Walk-through of the setup of a local TTRC Development Environment

## Prep the client 
- In your .bashrc or at your $ prompt excute this to give node room to run  "$ export TOOL_NODE_FLAGS="--max_old_space_size=8192" 
- Create a subdirectory, on WSL somewere in the main /mnt/c user space.
- Install Meteor.  https://www.meteor.com/install

## Clone the Repo and checkout a current dev branch 
- $   git clone -b feature/teams-develop git@github.com:teamtrials/Rocket.Chat.git  # note this may not be the exact branch you are 
  or if you really must clone the whole repo via http and checkout the correct at-the-time features/teams-develop-xx branch
  https://github.com/TeamTrials/Rocket.Chat    ... and checkout the correct at-the-time features/teams-develop-xx branch

## Create your working branch to capture and then submit your changes back to the features/teams-develop branch 
- Checkout the working branch you seek or create and new extenstion of the features/teams-develop branch to do your work.
- Create a copy of your new branch on our shared repo $ git push -u origin <your new branch name>
- Commit changes on this new exenstion of 'features/teams-develop" branch and then $ git push origin <your new branch name> daily with your work.


# BEFORE executing the meteor command to start the Application build execute the next few steps


## Create your local and project specfic application buid environment
- CD into the TeamTrials or Rocket.Chat subdirectory, the same subdirectory hosting package.json

## Setup git.    Why? there is a significant crlf and end of line corruption problem in the upstream Rocket.Chat repository.  We need to protect our time and work quality.  
-- Copy in a strong copy of .gitattributes if one does not already exist in the same subdirectory wth package (the "project root" directory).
-- Edit the .git/config file to include "autolf = input" and "eol = lf" in the [core} section

## In "project root" directory execute (copy, paste and hit enter) the following commands in the order they are listed.
$  meteor npm install npm

### Why the line below?  Installing the latest globally lowers risk of issues from emerging dependencies and sometimes help to resolve version dependency conflicts that can not be solved in the project structure alone.  
$  meteor npm update -g && meteor npm install -g node-gyp@latest node-pre-gyp@latest rimraf@latest hawk@latest semver@latest mkdirp@latest tar@latest chownr@latest cryptiles@latest sntp@latest core-util-is@latest inherits@latest fibers@latest babel-core@latest babel-preset-es2015@latest @octokit/rest@latest hoek@latest ipaddr.js@latest define-properties@latest follow-redirects@latest ignore@latest path-parse@latest chai@latest sax@latest @types/node@latest sshpk@latest chromedriver@latest webdriverio@latest uuid@latest selenium-standalone@latest is-ci@latest get-caller-file@latest convert-source-map@latest domhandler@latest esprima@latest extend@latest @nodelib/fs.stat@latest 

## WINDOWS:  If on Windows then install "$ meteor npm install -g --production windows-build-tools"
- Why? https://github.com/meteor/meteor/issues/10113
- If you have a real full node environment on Windows drop the 'meteor' off the front of the command.  

### Why the two lines below? meteor installs often fail for a lack of visible to meteor build dependencies
$  meteor npm install --save node-gyp node-pre-gyp rimraf hawk@3.1.3 mkdirp@0.5.1 tar@2.2.1 chownr@1.1.1 cryptiles@2.0.5 sntp@1.0.9 core-util-is@1.0.2 inherits@2.0.3 
$  meteor npm install meteor-node-stubs fibers babel-core@latest babel-preset-es2015@latest @octokit/rest@15.11.3 hoek@2.16.3 chai@3.5.0     #  the absense of the "--save" option is intentional

### Why the two Katex lines below?  Rocket.Chat core team auto-install scripts for katex installs / builds have been failing recently 
$  meteor npm install --save katex
$  meteor npm run postinstall

### Why the next line?  The meteor team broke babel for all but versions below 1.7.0.4.   If version beta.55 gives you trouble try "$ meteor npm install --save-exact @babel/runtime@7.0.0-beta.49"    
$  meteor npm install --save-exact @babel/runtime@7.0.0-beta.55

### Why the next line? Dependencies are not auto-installed or managed by meteor. Dependencies are the dev team's responsibility. Execute the command below to install current versions of Dependencies to a Depth of 3-4 (this changes frequently).  The absense of the "--save" option is intentional   
$  meteor npm install boom@2.10.1 ignore@3.3.10 ipaddr.js@1.8.1 define-properties@1.1.3 follow-redirects@1.5.8 ignore@3.3.10 path-parse@1.0.6 sax@1.2.4 @types/node@10.9.4 sshpk@1.14.2 table@4.0.3 bluebird@3.5.2 chromedriver@2.41.0 webdriverio@4.13.2 uuid@3.3.2 selenium-standalone@6.15.3 is-ci@1.2.1 get-caller-file@1.0.3 convert-source-map@1.6.0 domhandler@2.4.2 esprima@4.0.1 extend@3.0.2 @nodelib/fs.stat@1.1.2 browserify-des@1.0.2 elliptic@6.4.1 loose-envify@1.4.0 nanomatch@1.2.13 stream-http@2.8.3 util@0.10.4


# Set up local app EVN settings and / or settings json files 
- (add more text later on environment and settings files)
### Why the next line?  Speed up compile time and reduce compile errors by giving node the RAM it needs
$  export TOOL_NODE_FLAGS="--max_old_space_size=4096"      



# NOW execute Meteor to compile and run the app.  
### Why the next line?  Speed up compile time and reduce compile errors by giving node the RAM it needs
$  export TOOL_NODE_FLAGS="--max_old_space_size=4096"
### Why the is "--release 1.xx <current rev> o the next line?  Save execution time and Lowers risk of unplanned Meteor upgrades
$  [optional Mongo URL] meteor --release 1.6.1.3  <
#### Key References - Meteor command line build and testing options 
- Meteor CLI / Build Options Controls    https://docs.meteor.com/commandline.html



# Top RC build KNOWN ISSUES and FIXes for COMMON PROBLEMS as of Sept 16, 2018
- One link to where the Meteor team is discussing key issues they are concerned about and early, not validated tips on fixes https://github.com/meteor/meteor/pull/9942
- @Babel fails to install -- follow the steps and notes above to avoid some of this pain
- @Babel, Meteor RC build fails because of an issue with a file under Babel/Runtime/helpers...  -- this is frustrating but often has a simple fast fix. 1) From the project root $ cd node_modules/@babel/runtime/helpers/"  2) In thsat Subdir  "$  mkdir builtin"  3) copy all the files in the "helpers/" subdir into the new "helpers/builtin" subdir you just created and you are Done!  Run Metoer to start your build again. 
- fibers fails to install and causes a long list of build issues -- just follow the steps above to avoid this pain
- Mongo drivers and calls -- we need to test to make sure we are good after the upgrade
- Linting constraints have increased. Linting issues on in other people's code might cause our compile to fail, where the app still seems to compile and function correctly -- carefully, slowly add trouble spots out side our control to .eslintignore    
- Intermitant RocketChat-i18n duplicate source issues -- not sure the cause. Maybe a .xxxignore file issue somewhere? Build faling somewhere.  I dont know the cause but several times downloaded the zip file with current develop branch code from RocketChat/RocketChat on github and manually copied / replaced the local fils with files from the zip and the issue go away. 
- "$ meteor update --all-packages" sometimes fails.  Not yet sure why. Seems like this could not be 'our' code so is either upstream rc core team issues or something about dependencies or local environment.  
- Meteor Package upgrades exist that the RC team has not yet adopted (see list just below).  The RC core team has not migrated for a reason. Just too busy are are there issues?  If you see trouble that one of these packages migh solve it might be worth taking a look at th package. 

#### Meteor Packages newer than what RocketChat v69 (on meteor v1.6.1.3) is configured to use (as of Sept 16 2018)     
session                                    1.1.7* Session variable
meteor-base                                1.3.0* Packages that every Meteor app needs
mongo                                      1.4.7* Adaptor for using MongoDB and Minimongo over DDP
reactive-dict                              1.2.0* Reactive dictionary
tracker                                    1.1.3* Dependency tracker to allow reactive callbacks
session                                    1.1.7* S
ecmascript                                 0.10.9* Compiler plugin that supports ES2015+ in all .js files
ostrio:cookies                             2.2.4* Isomorphic bulletproof Server and Client cookie functions
dynamic-import                             0.3.0* Runtime support for Meteor 1.5 dynamic import(...) syntax
ecmascript                                 0.10.9* Compiler plugin that supports ES2015+ in all .js files