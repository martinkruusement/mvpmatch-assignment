# $1: File name
# $2 .sublime-project file name
# TODO: See if we can match any $2.build_router[filenameRegex]: "command"
# TODO: If yes, run that command to deal with the file

if [[ $1 == "package.json" ]]
then
npm run lint:package
fi  

