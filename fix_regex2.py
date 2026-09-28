with open("main.js", "r") as f:
    text = f.read()

text = text.replace("contractNumber.replace(///g, '_')", "contractNumber.replace(/\\//g, '_')")

with open("main.js", "w") as f:
    f.write(text)
