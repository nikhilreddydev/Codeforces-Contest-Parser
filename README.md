# codeforces-contest-parser
A CLI bot to fetch IO and verify output of problems with ONLINE JUDGE solution

# Requirements
node [install](https://nodejs.org/en/download/)

colordiff - $ sudo apt install colordiff

# Istallation
`git clone THIS_REPO`

`cd codeforces-contest-parser`

`npm install`

`chmod u+x run.sh`

# Usage
`node script.js CONTEST-NO`

Code the solution in the auto-generated sol.cpp file in each problem directory

`./run.sh PROBLEM`

If all the test cases are passed, no output is showed.
Else the diff of required output is displayed.
