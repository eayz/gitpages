# 1 -> input (with file extenstion)
# 2 -> output (with file extension)

# ffmpeg -i $1 -vf "select=eq(n\,0)" -q:v 1 $2
ffmpeg -sseof -3 -i $1 -update 1 -q:v 1 $2
