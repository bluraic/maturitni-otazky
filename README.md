# 📚 Systém správy maturitních otázek

Kompletní systém pro snadnou správu otázek bez nutnosti editace HTML.

## ⚡ RYCHLÝ START (DŮLEŽITÉ!)

**Systém vyžaduje spuštění přes webový server** (ne přímo z souboru!), jinak nebude fungovat kvůli CORS omezením.

### Varianta 1: Python web server (nejjednodušší)
```bash
# Otevřete PowerShell v adresáři projektu a spusťte:
python serve.py

# Potom otevřete v prohlížeči:
http://localhost:8000
```

### Varianta 2: Node.js http-server
```bash
npm install -g http-server
http-server . -p 8000
```

### Varianta 3: VS Code Live Server
- Nainstalujte rozšíření "Live Server" v VS Code
- Klikněte "Go Live" pro spuštění lokálního serveru

---

## 🔄 Jak to funguje?

1. **Admin panel** ([admin.html](admin.html)) načte otázky z `questions.json`
2. Když editujete/přidáváte otázky, data se uloží do **localStorage**
3. **Kategorie stránky** (cestina.html, it-ve-verejne-sprave.html, atd.) pak načítají data z localStorage
4. Pokud localStorage není dostupný, používají fallback data

### Tok dat:
```
questions.json → admin.html → localStorage → ostatní stránky
```

## 📝 Jak přidać novou otázku?

1. Otevřete [admin.html](admin.html) v prohlížeči
2. Vyberte kategorii
3. Klikněte na "+ Přidat novou otázku"
4. Vyplňte název a obsah (HTML formát)
5. Klikněte "Přidat otázku"
6. Data se uloží lokálně (v indexedDB/localStorage)

## ✏️ Jak upravit existující otázku?

1. Otevřete [admin.html](admin.html)
2. Vyberte kategorii
3. Klikněte na otázku v seznamu vlevo
4. Upravte název nebo obsah
5. Klikněte "Uložit otázku"

## 🗑️ Jak smazat otázku?

1. Vyberte otázku v admin panelu
2. Klikněte "Smazat otázku"
3. Potvrďte smazání

## 💾 Export a Import

### Exportovat (zálohovat) data
- V admin panelu klikněte "Exportovat data"
- Stahne se JSON soubor s aktuálními otázkami

### Importovat data
- V admin panelu klikněte "Importovat data"
- Vyberte JSON soubor
- Data se nahrajou do systému

## 📂 Struktura Questions.json

```json
{
  "categories": {
    "cestina": {
      "title": "Čeština",
      "questions": [
        {
          "id": "q1",
          "title": "Název otázky",
          "content": "<h3>Nadpis</h3><p>Text...</p>"
        }
      ]
    },
    "it-ve-verejne-sprave": { ... },
    "informacni-a-komunikacni-technologie": { ... }
  }
}
```

## 🛠️ HTML tips pro obsah otázek

```html
<h3>Hlavní nadpis</h3>
<p>Odstavec textu.</p>

<ul>
  <li>Položka seznamu 1</li>
  <li>Položka seznamu 2</li>
</ul>

<h4>Podnadpis</h4>
<table border='1'>
  <tr>
    <th>Sloupec 1</th>
    <th>Sloupec 2</th>
  </tr>
  <tr>
    <td>Data 1</td>
    <td>Data 2</td>
  </tr>
</table>

<strong>Tučný text</strong>
<em>Kurzívní text</em>
```

## 🔧 API (pro vývojáře)

```javascript
// V konzoli (pokud máte otevřekou kategorii):
const manager = window.questionManager;

// Načíst všechny otázky pro kategorii
const questions = manager.getQuestionsByCategory('cestina');

// Přidat otázku
manager.addQuestion('cestina', {
  title: 'Nová otázka',
  content: '<p>Obsah</p>'
});

// Upravit otázku
manager.updateQuestion('cestina', 'q1', {
  title: 'Nový název',
  content: '<p>Nový obsah</p>'
});

// Smazat otázku
manager.deleteQuestion('cestina', 'q1');

// Exportovat data
manager.exportToJSON();
```

## ⚙️ Jak funguje backend load-questions.js?

1. Při načtení stránky se spustí DOMContentLoaded event
2. Skript detekuje třídu na &lt;body&gt; elementu (cestina, it-verejne-sprave, ikt)
3. Stáhne questions.json
4. Vyhledá odpovídající kategorii
5. Dynamicky vytvoří sidebar a obsah
6. Připojí event listenery pro klikání

## 🐛 Troubleshooting

**❌ "Otázky se nenačítají na kategorie stránkách"**
- ✅ Nejčastěji je **CORS/file:// problém**
- ✅ **Řešení:** Spusťte webový server (viz RYCHLÝ START výše)
- ❌ Neotevírejte HTML soubory přímým kliknutím na soubor!

**❌ "Admin panel nefunguje / Otázky nejsou vidět"**
- Zkontrolujte že máte JavaScript zapnutý
- Otevřete DevTools (F12) → Console a podívejte se na chyby
- Zkuste smazat localStorage: `localStorage.clear()` v konzoli

**❌ "Otázky se ztratily po refreshi"**
- Otázky jsou uloženy v localStorage prohlížeče
- Pokud chcete trvalé uložení, exportujte si JSON: Admin panel → "Exportovat data"
- localStorage se automaticky vymaže, pokud smažete historii/cookies

**❌ "Otázky jsou jenom částečné/zkrácené"**
- Zkontrolujte, zda jste v admin panelu otevřeli všechny kategorie
- Počet otázek by měl být:
  - Čeština: 2+ otázek
  - IT ve veřejné správě: 11 otázek
  - IKT: 10 otázek

## 📱 Kompatibilita

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ❌ IE 11 (starý prohlížeč)

## 🚀 Budoucí vylepšení

- [ ] Serverové uložení dat (databáze)
- [ ] Přihlášení uživatelů
- [ ] Vyhledávání otázek
- [ ] Náhled HTML ve editoru
- [ ] Export do PDF
- [ ] Offline režim

---

**Otázky?** Podívejte se na kód v load-questions.js nebo admin.html - vše je dobře komentováno! 😊
