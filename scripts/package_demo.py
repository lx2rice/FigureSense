from pathlib import Path
import re,json,base64,zipfile
root=Path.cwd();s=(root/'FigureSense-Hero.html').read_text()
def data(path,mime):return 'data:'+mime+';base64,'+base64.b64encode((root/path).read_bytes()).decode()
s=s.replace('<html lang="en">','<html lang="en" data-start-demo="true">')
s=re.sub(r'<link[^>]*href="hero-assets/hero.css"[^>]*>',lambda _: '<style>'+Path('hero-assets/hero.css').read_text()+'</style>',s)
s=re.sub(r'<script[^>]*src="hero-assets/hero.js"[^>]*></script>',lambda _: '<script defer src="'+data('hero-assets/hero.js','text/javascript')+'"></script>',s)
s=re.sub(r'<link[^>]*href="https://fonts\.[^"]+"[^>]*>','',s)
s=re.sub(r"@import url\('https://fonts.googleapis.com/[^']+'\);",'',s)
for path,mime in [('figuresense-icon.png','image/png'),('hero-assets/xavier.png','image/png'),('hero-assets/ballet-leg-human.png','image/png'),('demo-assets/xavier-ballet-leg-demo.mp4','video/mp4')]:s=s.replace(path,data(path,mime))
s=re.sub(r'<a class="download-demo"[^>]*>.*?</a>','<span>Portable demo · video included</span>',s)
assert 'hero-assets/' not in s, 'Missing embedded asset'
assert 'demo-assets/' not in s
out=root/'downloads/FigureSense-Demo.html';out.write_text(s)
readme='''FigureSense Demo\n\nUnzip this folder, then double-click FigureSense-Demo.html.\nThe Ballet Leg demo opens automatically with Xavier’s included video and five checkpoint suggestions.\nNo server or installation is required.\n\nSelect a checkpoint; adjust its frame, drag the measuring dots, and save to confirm.\nUse the FigureSense logo to return to the home page.\n\nThe supplied demo uses visually reviewed frame suggestions. Its video, artwork,\nand app code are embedded. Pose detection for other uploaded clips requires\nan internet connection to download the model; video processing stays in the browser.\nAngles are 2D estimates, not official judging scores.\n\nUse a current desktop browser. Edits last for the current browser session.\n'''
with zipfile.ZipFile(root/'downloads/FigureSense-Demo.zip','w',zipfile.ZIP_DEFLATED) as z:
 z.write(out,'FigureSense-Demo/FigureSense-Demo.html')
 z.writestr('FigureSense-Demo/READ-ME.txt',readme)
with zipfile.ZipFile(root/'downloads/FigureSense-Demo.zip') as z:assert z.testzip() is None
print('Self-contained HTML:',out.stat().st_size,'bytes; ZIP:',(root/'downloads/FigureSense-Demo.zip').stat().st_size,'bytes')
