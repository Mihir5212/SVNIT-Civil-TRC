import re
with open('assets/js/page-flip.browser.js', 'r', encoding='utf-8') as f:
    c = f.read()

matches = [m.start() for m in re.finditer(r'onMouseMove', c)]
for m in matches:
    print(c[m-50:m+250])
    print("="*40)
