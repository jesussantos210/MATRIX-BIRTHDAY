# 🎂 Matrix Birthday Particle Reveal

Este proyecto es una experiencia visual interactiva desarrollada con **HTML5 Canvas** y **Vanilla JavaScript**. Combina una estética "Matrix" neón con un sistema de partículas físicas que forman una cuenta regresiva y un mensaje de celebración.

La animación finaliza con un efecto de limpieza y la revelación de un GIF sorpresa de gatos ("Cute Cats").

## 🚀 Características Principales

* **Doble Motor de Renderizado:** Utiliza dos lienzos (`canvas`) superpuestos; uno para la lluvia de código Matrix en el fondo y otro para las partículas de texto en primer plano.
* **Física de Partículas "Snap":** Implementación de un algoritmo de atracción magnética con alta fricción, logrando que los textos se formen con un movimiento seco y preciso (sin rebotes indeseados).
* **Gestión de Memoria:** Sistema de limpieza automática de partículas entre palabras para evitar la saturación del DOM y mantener el rendimiento fluido (60 FPS).
* **Diseño Responsivo:** El tamaño de la tipografía y la distribución de las partículas se recalculan matemáticamente según el `viewport` del dispositivo.

## 🛠️ Tecnologías

* **HTML5** (Estructura y Canvas API)
* **CSS3** (Estilos neón, Flexbox y Transiciones)
* **JavaScript** (ES6+, POO para la lógica de partículas)

## 📂 Estructura del Proyecto

```text
├── index.html                    # Punto de entrada
├── style.css                     # Estilos visuales
├── script.js                     # Lógica de animación y física
└── happy-birthday-cute.gif       # Animación final (Cute Cats)
```

## 📦 Instalación y Uso

1. Clona este repositorio:

git clone [[https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git](https://github.com/jesussantos210/MATRIX-BIRTHDAY)]

2. Asegúrate de tener un archivo llamado `final.gif` en la raíz del proyecto.

3. Abre el archivo `index.html` en tu navegador.

4. Haz clic en el botón **"INICIAR SISTEMA"** para comenzar la secuencia.

## 🎮 Personalización

Puedes modificar la secuencia de palabras editando el array secuenciaTexto en el archivo script.js:

```js
const secuenciaTexto = ["5", "4", "3", "2", "1", "HAPPY BIRTHDAY"];
 ```

```js 
 [ DEV ] Jesús Santos 🫡

```


