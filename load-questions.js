/**
 * Systém pro správu a načítání otázek
 * Umožňuje dynamické načítání otázek z localStorage, JSON souboru nebo výchozích dat
 */

class QuestionManager {
  constructor(dataFile = 'questions.json') {
    this.dataFile = dataFile;
    this.allQuestions = {};
    this.currentCategory = null;
  }

  /**
   * Načte otázky z localStorage nebo JSON souboru
   */
  async loadQuestions() {
    try {
      // Pokus 1: Načíst z localStorage (uloženo admin panelem)
      const storedData = localStorage.getItem('questionData');
      if (storedData) {
        this.allQuestions = JSON.parse(storedData);
        console.log('✓ Otázky načteny z localStorage, velikost:', Object.keys(this.allQuestions).length, 'kategorií');
        return { categories: this.allQuestions };
      }

      console.log('❌ localStorage je prázdné, pokousím se načít z questions.json...');

      // Pokus 2: Načíst z JSON souboru
      const response = await fetch(this.dataFile + '?v=' + Date.now());
      if (response.ok) {
        const data = await response.json();
        this.allQuestions = data.categories;
        console.log('✓ Otázky načteny z questions.json, velikost:', Object.keys(this.allQuestions).length, 'kategorií');
        return data;
      }

      console.log('❌ questions.json není dostupný, používám fallback data...');

      // Pokus 3: Použít výchozí data (fallback)
      this.allQuestions = this.getDefaultData();
      console.log('✓ Otázky načteny z výchozích dat');
      return { categories: this.allQuestions };
    } catch (error) {
      console.error('✗ Chyba při načítání otázek, používám výchozí data:', error);
      this.allQuestions = this.getDefaultData();
      return { categories: this.allQuestions };
    }
  }

  /**
   * Vrátí výchozí/fallback data
   */
  getDefaultData() {
    return {
      "cestina": {
        "title": "Čeština",
        "questions": [
          {"id":"q1","title":"Jack Kerouac","content":"<h3>O autorovi</h3><ul><li>Cestovatel, představitel <strong>Beat generation</strong> – USA po 2. světové válce</li><li>Témata svobody, cestování a spirituality</li></ul>"},
          {"id":"q2","title":"William Styron","content":"<h3>O autorovi</h3><ul><li>Prozaik, <strong>jižanská próza</strong></li><li>Gotika a neorealismus (poválečný)</li></ul>"}
        ]
      },
      "it-ve-verejne-sprave": {
        "title": "IT ve veřejné správě",
        "questions": [
          {"id":"q1","title":"Mezinárodní právo v ICT","content":"<h3>Základní charakteristika</h3><p>Mezinárodní právo - soubor právních pravidel pro ICT.</p>"},
          {"id":"q2","title":"Právo v ICT","content":"<h3>EU regulace</h3><p><strong>GDPR:</strong> Ochrana osobních údajů.</p>"},
          {"id":"q3","title":"Softwarové právo","content":"<h3>Softwarové právo</h3><p>Ochrana počítačových programů jako autorských děl.</p>"},
          {"id":"q4","title":"Internetová reklama","content":"<h3>Spam a Internet marketing</h3><p>Antispamový zákon zakazuje nevyžádané obchodní sdělení.</p>"},
          {"id":"q5","title":"Domény a spory","content":"<h3>Domény a jejich právní povaha</h3><p>Doména je oprávnění k užívání, nikoli vlastnictví.</p>"},
          {"id":"q6","title":"Bezpečnostní analýza","content":"<h3>CIA Triáda</h3><p>Důvěrnost, Integrita, Dostupnost.</p>"},
          {"id":"q7","title":"Bezpečnost IS","content":"<h3>Typy hrozeb</h3><p>Technické, Lidské, Fyzické.</p>"},
          {"id":"q8","title":"Elektronický podpis","content":"<h3>E-podpis</h3><p>Matematický výsledek operace nad dokumentem.</p>"},
          {"id":"q9","title":"Bezpečnost Internetu","content":"<h3>Bezpečnostní protokoly</h3><p>HTTPS, SSH, IPsec.</p>"},
          {"id":"q10","title":"Kryptografia","content":"<h3>Dělení</h3><p>Symetrická, Asymetrická, Hashovací.</p>"},
          {"id":"q11","title":"Internet věcí","content":"<h3>IoT</h3><p>Propojení fyzických zařízení prostřednictvím sítě.</p>"}
        ]
      },
      "informacni-a-komunikacni-technologie": {
        "title": "Informační a komunikační technologie",
        "questions": [
          {"id":"q1","title":"xDSL technologie","content":"<h3>ADSL a VDSL</h3><p>Asymetrická a velmi vysokorychlostní DSL technologie.</p>"},
          {"id":"q2","title":"Počítačová síť","content":"<h3>Topologie</h3><p>BUS, RING, STAR, TREE, MESH.</p>"},
          {"id":"q3","title":"Mobilní sítě","content":"<h3>Generace</h3><p>2G, 3G, 4G, 5G.</p>"},
          {"id":"q4","title":"Wi-Fi a Bluetooth","content":"<h3>Bezdrátové technologie</h3><p>Wi-Fi (802.11) a Bluetooth.</p>"},
          {"id":"q5","title":"Adresace MAC a IP","content":"<h3>MAC a IP adresy</h3><p>Fyzická a logická adresace v síti.</p>"},
          {"id":"q6","title":"Routing","content":"<h3>Směrování</h3><p>RIP, OSPF, BGP protokoly.</p>"},
          {"id":"q7","title":"Web pojmy","content":"<h3>WWW, HTML, DNS</h3><p>Základní koncepty webu.</p>"},
          {"id":"q8","title":"HTML, CSS, JS, PHP","content":"<h3>Webové technologie</h3><p>Základní syntaxe a použití.</p>"},
          {"id":"q9","title":"Statické vs dynamické weby","content":"<h3>Porovnání</h3><p>Pevný obsah vs. generovaný z databáze.</p>"},
          {"id":"q10","title":"Čitelnost textu","content":"<h3>Typografické parametry</h3><p>Font-size, line-height, kontrast.</p>"}
        ]
      }
    };
  }

  /**
   * Vrátí otázky pro danou kategorii
   */
  getQuestionsByCategory(categoryKey) {
    console.log(`🔍 getQuestionsByCategory("${categoryKey}")`);
    console.log('   Dostupné klíče v allQuestions:', Object.keys(this.allQuestions));
    const result = this.allQuestions[categoryKey]?.questions || [];
    console.log(`   ➜ Vrací ${result.length} otázek`);
    return result;
  }

  /**
   * Vrátí otázku podle ID v dané kategorii
   */
  getQuestionById(categoryKey, questionId) {
    const questions = this.getQuestionsByCategory(categoryKey);
    return questions.find(q => q.id === questionId);
  }

  /**
   * Vykreslí otázky na stránku
   * Předpokládá HTML strukturu s: .sidebar ul, .questions-container
   */
  renderQuestions(categoryKey) {
    console.log(`\n🎨 === RENDER QUESTIONS START ===`);
    console.log(`   Kategorie: "${categoryKey}"`);
    console.log(`   this.allQuestions klíče:`, Object.keys(this.allQuestions));
    console.log(`   this.allQuestions:`, this.allQuestions);
    
    const questions = this.getQuestionsByCategory(categoryKey);
    console.log(`   Počet otázek: ${questions.length}`);
    
    if (!questions.length) {
      console.error(`❌ CHYBA: Žádné otázky pro kategorii: ${categoryKey}`);
      return;
    }

    const sidebarList = document.querySelector('.sidebar ul');
    const container = document.querySelector('.questions-container');

    console.log(`   HTML check:`);
    console.log(`      .sidebar ul: ${sidebarList ? '✓ EXISTUJE' : '❌ NENALEZENO'}`);
    console.log(`      .questions-container: ${container ? '✓ EXISTUJE' : '❌ NENALEZENO'}`);

    if (!sidebarList || !container) {
      console.error('❌ CHYBA: Chybí HTML elementy!');
      console.error(`   Sidebar ul objekt:`, sidebarList);
      console.error(`   Container objekt:`, container);
      console.error(`   Celý DOM:`, document.body);
      return;
    }

    // Vyčistit obsah
    sidebarList.innerHTML = '';
    container.innerHTML = '';
    console.log(`   ✓ Očistil jsem HTML`);

    // Vytvořit tlačítka v sidebaru
    questions.forEach((q, index) => {
      const button = document.createElement('button');
      button.id = `btn-${q.id}`;
      button.className = 'question-btn' + (index === 0 ? ' active' : '');
      button.textContent = `${q.id.toUpperCase()} – ${q.title}`;
      button.style.width = '100%';
      button.style.textAlign = 'left';
      button.style.padding = '12px';
      button.style.border = 'none';
      button.style.background = index === 0 ? 'rgba(0,255,0,0.2)' : 'transparent';
      button.style.color = '#adef8b';
      button.style.cursor = 'pointer';
      button.style.borderLeft = (index === 0 ? '3px' : '3px') + ' solid ' + (index === 0 ? '#adef8b' : '#444');
      button.style.transition = 'all 0.2s';
      button.onclick = () => this.switchQuestion(q.id);
      sidebarList.appendChild(button);
    });

    console.log(`   ✓ Vytvořil ${questions.length} tlačítek v sidebaru`);

    // Vytvořit sekce s otázkami
    questions.forEach((q, index) => {
      const section = document.createElement('section');
      section.id = `question-${q.id}`;
      section.className = 'question';
      section.style.display = index === 0 ? 'block' : 'none';
      section.style.animation = 'fadeIn 0.3s';
      section.innerHTML = `<h2>${q.title}</h2>${q.content}`;
      container.appendChild(section);
    });

    console.log(`   ✓ Vytvořil ${questions.length} sekcí v containeru`);
    console.log(`🎨 === RENDER QUESTIONS OK ===\n`);
  }

  /**
   * Přepne na danou otázku
   */
  switchQuestion(questionId) {
    console.log(`🔄 switchQuestion: ${questionId}`);
    
    // Skrýt všechny sekce
    const sections = document.querySelectorAll('.question');
    sections.forEach(sec => {
      sec.style.display = 'none';
    });
    
    // Zobrazit vybranou sekci
    const targetSection = document.querySelector(`#question-${questionId}`);
    if (targetSection) {
      targetSection.style.display = 'block';
      console.log(`   ✓ Zobrazena sekce: #question-${questionId}`);
    }
    
    // Zmenit active stav tlačítek
    const buttons = document.querySelectorAll('.question-btn');
    buttons.forEach(btn => {
      const isActive = btn.id === `btn-${questionId}`;
      btn.classList.toggle('active', isActive);
      btn.style.background = isActive ? 'rgba(0,255,0,0.2)' : 'transparent';
      btn.style.borderLeftColor = isActive ? '#adef8b' : '#444';
    });
  }

  /**
   * Připojí event listenery na otázky (legacy - už se nepoužívá s novým systémem)
   */
  attachEventListeners() {
    // Nový systém používá onclick na tlačítka, není potřeba event listeners
  }

  /**
   * Exportuje otázky do JSON (pro stažení)
   */
  exportToJSON() {
    const dataStr = JSON.stringify({ categories: this.allQuestions }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'questions-backup.json';
    link.click();
    console.log('✓ Exportoval jsem otázky');
  }

  /**
   * Přidá novou otázku do kategorie
   */
  addQuestion(categoryKey, question) {
    if (!this.allQuestions[categoryKey]) {
      console.error(`Kategorie ${categoryKey} neexistuje`);
      return false;
    }

    // Vytvořit nové ID
    const nextId = `q${Math.max(...this.getQuestionsByCategory(categoryKey).map(q => parseInt(q.id.slice(1)))) + 1}`;
    question.id = nextId;

    this.allQuestions[categoryKey].questions.push(question);
    console.log(`✓ Otázka přidána: ${question.title}`);
    return question;
  }

  /**
   * Aktualizuje otázku
   */
  updateQuestion(categoryKey, questionId, updatedData) {
    const questions = this.getQuestionsByCategory(categoryKey);
    const question = questions.find(q => q.id === questionId);

    if (!question) {
      console.error(`Otázka ${questionId} nebyla nalezena`);
      return false;
    }

    Object.assign(question, updatedData);
    console.log(`✓ Otázka aktualizována: ${question.title}`);
    return question;
  }

  /**
   * Smaže otázku
   */
  deleteQuestion(categoryKey, questionId) {
    const questions = this.getQuestionsByCategory(categoryKey);
    const index = questions.findIndex(q => q.id === questionId);

    if (index === -1) {
      console.error(`Otázka ${questionId} nebyla nalezena`);
      return false;
    }

    const deleted = questions.splice(index, 1);
    console.log(`✓ Otázka smazána: ${deleted[0].title}`);
    return true;
  }
}

/**
 * Inicializace na načtení stránce
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Debug log do localStorage
  const debugLog = (msg) => {
    console.log(msg);
    const existing = localStorage.getItem('_debug') || '';
    localStorage.setItem('_debug', existing + msg + '\n');
  };

  debugLog('✓ DOMContentLoaded fired');

  const manager = new QuestionManager();
  window.questionManager = manager;
  await manager.loadQuestions();

  debugLog('📋 Kategorie: ' + Object.keys(manager.allQuestions).join(', '));

  // Mapování tříd na kategorie
  const categoryMap = {
    'cestina': 'cestina',
    'it-ve-verejne-sprave': 'it-ve-verejne-sprave',
    'ikt': 'informacni-a-komunikacni-technologie'
  };

  // Detekovat kategorii z třídy body
  let category = null;
  const bodyClasses = Array.from(document.body.classList);
  debugLog('Body třídy: ' + bodyClasses.join(', '));

  for (const [className, categoryKey] of Object.entries(categoryMap)) {
    if (document.body.classList.contains(className)) {
      debugLog(`✓ Detekována: ${className} → ${categoryKey}`);
      category = categoryKey;
      break;
    }
  }

  if (category) {
    const questions = manager.getQuestionsByCategory(category);
    debugLog(`📝 Otázek: ${questions.length}`);
    
    const sidebarUl = document.querySelector('.sidebar ul');
    const container = document.querySelector('.questions-container');
    debugLog(`🔍 HTML elementy existují: sidebar=${!!sidebarUl}, container=${!!container}`);
    
    manager.renderQuestions(category);
    debugLog('✅ renderQuestions volánno');
  } else {
    debugLog('❌ Kategorie nebyla detekována!');
  }
});
