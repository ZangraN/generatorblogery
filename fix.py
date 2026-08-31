with open('main.js', 'r') as f:
    code = f.read()
code = code.replace("contractNumber.replace(/\\\\//g, '_')", "contractNumber.replace(/\\//g, '_')")
with open('main.js', 'w') as f:
    f.write(code)
