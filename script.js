// --- CONFIGURACIÓN DE CAPAS --- //
const bgCanvas = document.getElementById('bgCanvas');
const ctxBg = bgCanvas.getContext('2d');

const fgCanvas = document.getElementById('fgCanvas');
const ctxFg = fgCanvas.getContext('2d');

// Referencia a la imagen final //
const imagenFinal = document.getElementById('imagenFinalContainer');

function redimensionar() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    fgCanvas.width = window.innerWidth;
    fgCanvas.height = window.innerHeight;
}
redimensionar();
window.addEventListener('resize', redimensionar);

// --- CONFIGURACIÓN --- //
//El último elemento siempre activa el GIF. //
const secuenciaTexto = ["5", "4", "3", "2", "1", "HAPPY", "BIRTHDAY", "AMBAR!"];

const colorMatrix = '#D600FF'; // Violeta claro y brillante //
const colorTexto = '#ff00ff';  // Magenta Neón //

let indiceTexto = 0;
let particulas = []; 
const resolucion = 3; 

// --- MATRIX (FONDO) --- //
const fontSize = 16;
const columnas = Math.floor(window.innerWidth / fontSize);
const caidas = Array(columnas).fill(1);
const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

function dibujarMatrix() {
    ctxBg.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctxBg.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    
    ctxBg.fillStyle = colorMatrix;
    ctxBg.font = fontSize + 'px monospace';

    for (let i = 0; i < caidas.length; i++) {
        const text = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        ctxBg.globalAlpha = 0.8; // Opacidad alta para que se vea claro //
        ctxBg.fillText(text, i * fontSize, caidas[i] * fontSize);
        ctxBg.globalAlpha = 1.0;

        if (caidas[i] * fontSize > bgCanvas.height && Math.random() > 0.98) {
            caidas[i] = 0;
        }
        caidas[i]++;
    }
}

// --- CONTROL DE PARTÍCULAS --- //
class Particula {
    constructor(destinoX, destinoY) {
        this.x = Math.random() * fgCanvas.width;
        this.y = Math.random() * fgCanvas.height;
        this.destinoX = destinoX;
        this.destinoY = destinoY;
        this.size = 2;
        this.vx = 0;
        this.vy = 0;
        
        // MAGNETISMO //
        this.friccion = 0.85; 
        this.facilidad = 0.25;
    }

    update() {
        const dx = this.destinoX - this.x;
        const dy = this.destinoY - this.y;
        this.vx += dx * this.facilidad;
        this.vy += dy * this.facilidad;
        this.vx *= this.friccion;
        this.vy *= this.friccion;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctxFg.shadowBlur = 5;
        ctxFg.shadowColor = colorTexto;
        ctxFg.fillStyle = colorTexto;
        ctxFg.beginPath();
        ctxFg.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxFg.fill();
        ctxFg.shadowBlur = 0;
    }
}

function crearTexto(texto) {
    particulas = []; 

    let tamanoFuente = window.innerWidth / 5;
    if (tamanoFuente > 180) tamanoFuente = 180;
    if (tamanoFuente < 60) tamanoFuente = 60;
    if (texto.length > 3) tamanoFuente = tamanoFuente * 0.6;

    ctxFg.font = `900 ${tamanoFuente}px "Arial Black", Arial, sans-serif`;
    ctxFg.fillStyle = 'white';
    ctxFg.textAlign = 'center';
    ctxFg.textBaseline = 'middle';
    ctxFg.fillText(texto, fgCanvas.width/2, fgCanvas.height/2);

    const imgData = ctxFg.getImageData(0, 0, fgCanvas.width, fgCanvas.height).data;
    ctxFg.clearRect(0, 0, fgCanvas.width, fgCanvas.height); 

    for (let y = 0; y < fgCanvas.height; y += resolucion) {
        for (let x = 0; x < fgCanvas.width; x += resolucion) {
            if (imgData[(y * fgCanvas.width + x) * 4 + 3] > 128) {
                particulas.push(new Particula(x, y));
            }
        }
    }
}

function animar() {
    dibujarMatrix();
    ctxFg.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
    
    particulas.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animar);
}

// --- SECUENCIA --- //
function cicloPalabra() {
    if (indiceTexto > secuenciaTexto.length) return;

    crearTexto(secuenciaTexto[indiceTexto]);
    
    // Si NO es el último elemento //
    if (indiceTexto < secuenciaTexto.length - 1) {
        setTimeout(() => { particulas = []; }, 2000); // 2s visible
        setTimeout(() => {
            indiceTexto++;
            cicloPalabra();
        }, 3000); // 3s total para el siguiente //
        
    } else {
        // --- FINAL (ÚLTIMO ELEMENTO) --- //
        setTimeout(() => {
            particulas = []; // Borrar partículas //
            imagenFinal.classList.add('visible'); // Mostrar GIF //
            indiceTexto++; 
        }, 2500);
    }
}

// --- INICIO --- //
// 1. Arranca la lluvia Matrix INMEDIATAMENTE //
animar();

// 2. Esperamos 2 segundos para que la lluvia llene la pantalla //
setTimeout(() => {
    // 3. Ahora empieza la cuenta regresiva "5" //
    cicloPalabra();
}, 2000);

// --- FIRMA DIGITAL --- //
console.log(
    "%c DEV %c Jesús Santos %c 🫡 ",
    "background: #000000; color: #00ff00; border: 1px solid #00ff00; border-right: none; padding: 3px; border-radius: 4px 0 0 4px;",
    "background: #000000; color: #D600FF; border: 1px solid #D600FF; padding: 3px;",
    "background: #D600FF; color: #000000; border: 1px solid #D600FF; border-left: none; padding: 3px; border-radius: 0 4px 4px 0;"
);