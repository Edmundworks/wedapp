/* to start project

resume:

1. in command line cd into folder
2. run tsc --w to make it compile on save
3. npm start

from scratch:

setup here https://www.udemy.com/course/learn-typescript/learn/lecture/32735970#overview 

1. create new folder (mkdir somename)
1a. use tsc -- init to create a congig JSON file
2. create dist and src folders
3. create html file index.html - CREATE IN PROJECT FOLDER NOT DIST OR SRC
3a. Shift, 1, Enter to create default html text
3b. add script to link them together in body
 `<script src="./dist/index.js"></script>`
4. Go to JSON config file  (tsconfig.json) and 
5. Set outDir to Dist
6. Include Src by adding `,
  "include": ["src",]` outside th main declaration
7. .a create source code file index.ts in src `cd src` then `code index.ts` 
8. write someline like Hello world then save - should create index.js in dist
10. use tsc --w command to ensure the js file updates every time I
save the TS file
11. setup live updating browser
11aa. Open new terminal window (leave other one with tsc --w running)
11.ab change into your directory `cd directoryName`
11a. npm init -y to create JSON package file
11b. npm install lite-server
11c. in package.JSON remove test script and replace with
    "start": "lite-server"
11d. run command npm start and it should open a connected browser window
11e. Go to developer tools to see the output in the console


12. OPTIONAL changing default libs
12a. open sconfig.JSON
12b. lib should be commented out
12c. comment it back in
12d. Add the libaries you want inside the [] 
list of libs here https://www.typescriptlang.org/tsconfig#lib 

13a. type in the name of the array and it will appear in the console
14. Can use the localstorage to store strings in the browser not the DB - TODO - WHY do this?



*/ 