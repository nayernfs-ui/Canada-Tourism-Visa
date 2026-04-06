from html.parser import HTMLParser
from pathlib import Path
html = Path('index.html').read_text(encoding='utf-8')
void = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

class StackParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.events = []

    def handle_starttag(self, tag, attrs):
        self.events.append(('start', tag))
        if tag not in void:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        self.events.append(('end', tag))
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        else:
            self.errors.append((tag, list(self.stack[-10:])))

parser = StackParser()
parser.feed(html)
print('errors:', parser.errors)
print('remaining:', parser.stack[-30:])
print('remaining_count:', len(parser.stack))
print('form starts:', html.count('<form'))
print('form ends:', html.count('</form>'))
print('fieldset starts:', html.count('<fieldset'))
print('fieldset ends:', html.count('</fieldset>'))
print('div starts:', html.count('<div'))
print('div ends:', html.count('</div>'))
print('body starts:', html.count('<body'))
print('body ends:', html.count('</body>'))
print('html starts:', html.count('<html'))
print('html ends:', html.count('</html>'))
