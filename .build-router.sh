# $1: File name
# $2 .sublime-project file name
# TODO: See if we can match any $2.build_router[filenameRegex]: "command"
# TODO: If yes, run that command to deal with the file

echo $0
echo $1
echo $2
echo $3

if [[ $1 == "package.json" ]]
then
npm run lint:package
fi  

