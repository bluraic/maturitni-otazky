#!/usr/bin/env python3
"""
Jednoduchý webový server pro spuštění maturitních otázek lokálně
Spustěte: python serve.py
Potom otevřete: http://localhost:8000
"""

import http.server
import socketserver
import os

PORT = 8000
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"✓ Server běží na: http://localhost:{PORT}/")
    print(f"✓ Otevřete si index.html v prohlížeči")
    print(f"✓ Pro zastavení stiskněte CTRL+C")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✓ Server zastavený")
