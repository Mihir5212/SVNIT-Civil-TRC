with open('assets/js/page-flip.browser.js', 'r', encoding='utf-8') as f:
    c = f.read()

pos = c.find('onMouseMove(')
if pos != -1:
    print(c[pos-50:pos+350])
