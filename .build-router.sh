# $1: File name
# $2 .sublime-project file name

# Parse sublime-project.build_router and glob-match "pattern: command":
# {
#  "package-*.json": "npm run lint:package"
#  "*.css": "echo Nice got your css file",
#  "user.yml": "ls -hal",
# }

file=\"$1\"
project_file=$2

jq ".build_router | to_entries[] | .key, .value" $project_file |
while IFS= read -r key && IFS= read -r value; do
  if echo $file | grep -e "$key" > /dev/null; then
    echo $file matches $key
    echo "yes match"
    echo "$file: [$key] routed to command [$value]"
    cmd="${value%\"}"
    cmd="${cmd#\"}"
    eval $cmd
  fi
done
