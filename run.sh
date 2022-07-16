#!/bin/bash

# Ansi color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NOCOLOR='\033[0m'

# varibles for filenames
sourceFile=./$1/sol.cpp
executable=./$1/$1
inputFile=./$1/in.txt
outputFile=./$1/out.txt
currOutputFile=./$1/cout.txt

# compile the problem's code
echo "BUILDING ${sourceFile}";
g++ -std=c++17 ${sourceFile} -o ${executable}

# terminate if compilation fails
if [[ $? -eq 1 ]]
then
echo "BUILD FAILED";
exit 1
fi

# run the executable
echo "EXECUTING ON TEST INPUT."
${executable} < ${inputFile} > ${currOutputFile}

# diff it with required output
diff ${outputFile} ${currOutputFile} > /dev/null

# show the diff if tests fails
if [[ $? -eq 0 ]]
then
echo -e "${GREEN}All TESTS ARE PASSED${NOCOLOR}.";
else
colordiff -y ${outputFile} ${currOutputFile}
echo -e "${RED}TESTS FAILED${NOCOLOR}."
fi
