import os
import glob
import re

html_files = glob.glob('*.html')

new_head = '''<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAZE — Software Engineering</title>
    <meta name="description" content="RAZE develops high-performance enterprise systems, business management software, and custom digital platforms. Nothing redundant.">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" href="assets/images/raze-logo.svg">
</head>'''

new_nav = '''    <!-- Navigation -->
    <nav class="navbar">
        <div class="container nav-container">
            <a href="index.html" class="logo-link">
                <img src="assets/images/raze-logo.svg" alt="RAZE" class="logo-img">
                RAZE
            </a>
            <div class="nav-links">
                <a href="index.html" class="nav-link">Home</a>
                <a href="products.html" class="nav-link">Products</a>
                <a href="how-it-works.html" class="nav-link">How It Works</a>
                <a href="contact.html" class="btn btn-pill" style="margin-left: 16px;">Contact Us</a>
            </div>
        </div>
    </nav>'''

new_footer = '''    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="logo-link">
                    <img src="assets/images/raze-logo.svg" alt="RAZE" class="logo-img">
                    RAZE Software
                </div>
                <div class="footer-links">
                    <a href="products.html" class="footer-link">Products</a>
                    <a href="contact.html" class="footer-link">Contact</a>
                    <a href="#" class="footer-link">Twitter</a>
                    <a href="#" class="footer-link">GitHub</a>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p class="copyright">&copy; 2026 Raze Software. All rights reserved.</p>
                <div class="text-mono" style="color: var(--color-ash); font-size: 12px;">Status: All systems operational</div>
            </div>
        </div>
    </footer>
</body>
</html>'''

for file in html_files:
    if file == 'index.html' or file == '404.html':
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace head
    content = re.sub(r'<head>.*?</head>', new_head, content, flags=re.DOTALL)
    
    # Replace nav
    content = re.sub(r'<!-- Navigation -->.*?<!--', new_nav + '\n\n    <!--', content, flags=re.DOTALL)
    if '<!-- Navigation -->' not in content:
        content = re.sub(r'<nav.*?</nav>', new_nav, content, flags=re.DOTALL)
        
    # Replace footer
    content = re.sub(r'<!-- Footer -->.*?</html>', new_footer, content, flags=re.DOTALL)
    if '<!-- Footer -->' not in content:
        content = re.sub(r'<footer.*?</html>', new_footer, content, flags=re.DOTALL)
        
    # Add new classes to typical elements
    content = content.replace('class="btn btn-outline"', 'class="btn btn-secondary"')
    content = content.replace('<h1>', '<h1 class="text-heading">')
    content = content.replace('<h2>', '<h2 class="text-subheading">')
    content = content.replace('<p>', '<p class="text-body-muted">')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated all html files.")
