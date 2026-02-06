// ============================================================
// MUSEUM TILES — Sliding Puzzle Game Engine
// ============================================================

(function () {
  "use strict";

  const GRID = 4; // 4x4 puzzle (15-tile slider)
  const TOTAL = GRID * GRID;

  // ---------- STATE ----------
  let currentArtwork = null;
  let tiles = [];       // array of tile indices, 0 = empty
  let moves = 0;
  let timerInterval = null;
  let seconds = 0;
  let gameActive = false;

  // ---------- DOM REFS ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Screens
  const screenHome = $("#screen-home");
  const screenGallery = $("#screen-gallery");
  const screenTours = $("#screen-tours");
  const screenTourDetail = $("#screen-tour-detail");
  const screenGame = $("#screen-game");

  // ---------- HELPERS ----------

  function showScreen(screen) {
    $$(".screen").forEach((s) => s.classList.remove("active"));
    screen.classList.add("active");
    screen.scrollTop = 0;
  }

  // Deterministic "image of the day" based on date
  function getArtworkOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 86400000
    );
    return ARTWORKS[dayOfYear % ARTWORKS.length];
  }

  // Get all artworks except today's for the gallery
  function getPastArtworks() {
    const todayId = getArtworkOfTheDay().id;
    // Rotate list so past items come in a nice order
    const all = [...ARTWORKS];
    const todayIdx = all.findIndex((a) => a.id === todayId);
    const before = all.slice(0, todayIdx);
    const after = all.slice(todayIdx + 1);
    return [...after, ...before];
  }

  // ---------- HOME SCREEN ----------

  function initHome() {
    const art = getArtworkOfTheDay();

    // Front
    $("#featured-img").src = art.image;
    $("#featured-img").alt = art.title;
    $("#featured-title").textContent = art.title;
    $("#featured-artist").textContent = art.artist;

    // Back
    $("#back-title").textContent = art.title;
    $("#back-artist").textContent = art.artist;
    $("#back-year").textContent = art.year;
    $("#back-museum").textContent = art.museum;
    $("#back-description").textContent = art.description;

    // Flip
    const card = $("#featured-card");
    $("#btn-flip-featured").onclick = () => card.classList.add("flipped");
    $("#btn-unflip-featured").onclick = () => card.classList.remove("flipped");

    // Play today
    $("#btn-play-today").onclick = () => startGame(art);

    // Navigation
    $("#btn-go-gallery").onclick = () => {
      initGallery();
      showScreen(screenGallery);
    };
    $("#btn-go-tours").onclick = () => {
      initTours();
      showScreen(screenTours);
    };
  }

  // ---------- GALLERY SCREEN ----------

  function initGallery() {
    const grid = $("#gallery-grid");
    grid.innerHTML = "";
    const artworks = getPastArtworks();

    artworks.forEach((art) => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      card.innerHTML = `
        <img class="gallery-card-img" src="${art.image}" alt="${art.title}" loading="lazy">
        <div class="gallery-card-info">
          <div class="gallery-card-title">${art.title}</div>
          <div class="gallery-card-artist">${art.artist}</div>
        </div>
      `;
      card.onclick = () => startGame(art);
      grid.appendChild(card);
    });
  }

  // ---------- TOURS SCREEN ----------

  function initTours() {
    const list = $("#tours-list");
    list.innerHTML = "";

    TOURS.forEach((tour) => {
      const count = ARTWORKS.filter((a) => a.tour === tour.id).length;
      const card = document.createElement("div");
      card.className = "tour-card";
      card.innerHTML = `
        <div class="tour-icon">${tour.icon}</div>
        <div class="tour-text">
          <h3>${tour.name}</h3>
          <p class="tour-desc">${tour.description}</p>
          <p class="tour-count">${count} artwork${count !== 1 ? "s" : ""}</p>
        </div>
      `;
      card.onclick = () => {
        initTourDetail(tour);
        showScreen(screenTourDetail);
      };
      list.appendChild(card);
    });
  }

  // ---------- TOUR DETAIL SCREEN ----------

  function initTourDetail(tour) {
    $("#tour-detail-title").textContent = tour.name;
    $("#tour-detail-desc").textContent = tour.description;

    const grid = $("#tour-detail-grid");
    grid.innerHTML = "";

    const artworks = ARTWORKS.filter((a) => a.tour === tour.id);
    artworks.forEach((art) => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      card.innerHTML = `
        <img class="gallery-card-img" src="${art.image}" alt="${art.title}" loading="lazy">
        <div class="gallery-card-info">
          <div class="gallery-card-title">${art.title}</div>
          <div class="gallery-card-artist">${art.artist}</div>
        </div>
      `;
      card.onclick = () => startGame(art);
      grid.appendChild(card);
    });
  }

  // ---------- PUZZLE ENGINE ----------

  // Create solved state: [1,2,3,...,15,0]
  function solvedState() {
    const arr = [];
    for (let i = 1; i < TOTAL; i++) arr.push(i);
    arr.push(0);
    return arr;
  }

  function isSolved() {
    const solved = solvedState();
    return tiles.every((t, i) => t === solved[i]);
  }

  // Get row/col of empty tile
  function emptyPos() {
    const idx = tiles.indexOf(0);
    return { row: Math.floor(idx / GRID), col: idx % GRID, idx };
  }

  // Check if tile at index can move (adjacent to empty)
  function canMove(idx) {
    const e = emptyPos();
    const row = Math.floor(idx / GRID);
    const col = idx % GRID;
    return (
      (row === e.row && Math.abs(col - e.col) === 1) ||
      (col === e.col && Math.abs(row - e.row) === 1)
    );
  }

  // Swap tile with empty
  function moveTile(idx) {
    if (!canMove(idx)) return false;
    const e = emptyPos();
    [tiles[idx], tiles[e.idx]] = [tiles[e.idx], tiles[idx]];
    return true;
  }

  // Count inversions for solvability check
  function countInversions(arr) {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] && arr[j] && arr[i] > arr[j]) inv++;
      }
    }
    return inv;
  }

  // Check solvability for even-grid puzzles (4x4)
  function isSolvable(arr) {
    const inv = countInversions(arr);
    const emptyRow = Math.floor(arr.indexOf(0) / GRID);
    const fromBottom = GRID - emptyRow;
    // For even grids: solvable if (inversions even & blank on odd row from bottom)
    // or (inversions odd & blank on even row from bottom)
    return (inv % 2 === 0) === (fromBottom % 2 === 1);
  }

  // Shuffle tiles ensuring solvability
  function shuffleTiles() {
    do {
      tiles = solvedState();
      // Fisher-Yates shuffle
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
    } while (!isSolvable(tiles) || isSolved());
  }

  // ---------- RENDERING ----------

  function renderBoard() {
    const board = $("#puzzle-board");
    board.innerHTML = "";

    tiles.forEach((tileNum, idx) => {
      const div = document.createElement("div");
      div.className = "puzzle-tile" + (tileNum === 0 ? " empty" : "");

      if (tileNum !== 0) {
        // Calculate background position to show correct piece of image
        const srcRow = Math.floor((tileNum - 1) / GRID);
        const srcCol = (tileNum - 1) % GRID;
        const bgX = (srcCol / (GRID - 1)) * 100;
        const bgY = (srcRow / (GRID - 1)) * 100;

        div.style.backgroundImage = `url('${currentArtwork.image}')`;
        div.style.backgroundPosition = `${bgX}% ${bgY}%`;
      }

      if (tileNum !== 0) {
        div.onclick = () => handleTileClick(idx);
      }

      board.appendChild(div);
    });
  }

  function handleTileClick(idx) {
    if (!gameActive) return;
    if (moveTile(idx)) {
      moves++;
      $("#stat-moves").textContent = moves;
      renderBoard();
      if (isSolved()) {
        onWin();
      }
    }
  }

  // ---------- TIMER ----------

  function startTimer() {
    seconds = 0;
    clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function updateTimerDisplay() {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    $("#stat-time").textContent = `${min}:${sec.toString().padStart(2, "0")}`;
  }

  // ---------- GAME FLOW ----------

  function startGame(artwork) {
    currentArtwork = artwork;

    // Set header info
    $("#game-art-title").textContent = artwork.title;
    $("#game-art-artist").textContent = artwork.artist;
    $("#game-reference").src = artwork.image;

    // Info overlay content
    $("#info-title").textContent = artwork.title;
    $("#info-artist").textContent = artwork.artist;
    $("#info-year").textContent = artwork.year;
    $("#info-museum").textContent = artwork.museum;
    $("#info-description").textContent = artwork.description;

    // Reset state
    moves = 0;
    $("#stat-moves").textContent = "0";
    $("#win-overlay").classList.add("hidden");
    $("#info-overlay").classList.add("hidden");

    // Shuffle and render
    shuffleTiles();
    renderBoard();
    gameActive = true;
    startTimer();

    showScreen(screenGame);
  }

  function onWin() {
    gameActive = false;
    stopTimer();

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const timeStr = `${min}:${sec.toString().padStart(2, "0")}`;

    $("#win-img").src = currentArtwork.image;
    $("#win-stats").textContent = `Solved in ${moves} moves \u2022 ${timeStr}`;
    $("#win-art-info").textContent = `${currentArtwork.title} by ${currentArtwork.artist}`;
    $("#win-overlay").classList.remove("hidden");
  }

  // ---------- EVENT BINDING ----------

  function bindEvents() {
    // Back buttons
    $("#btn-gallery-back").onclick = () => showScreen(screenHome);
    $("#btn-tours-back").onclick = () => showScreen(screenHome);
    $("#btn-tour-detail-back").onclick = () => showScreen(screenTours);
    $("#btn-game-back").onclick = () => {
      stopTimer();
      gameActive = false;
      showScreen(screenHome);
    };

    // Game info overlay
    $("#btn-game-info").onclick = () =>
      $("#info-overlay").classList.remove("hidden");
    $("#btn-close-info").onclick = () =>
      $("#info-overlay").classList.add("hidden");
    $("#info-overlay").onclick = (e) => {
      if (e.target === $("#info-overlay"))
        $("#info-overlay").classList.add("hidden");
    };

    // Shuffle button
    $("#btn-shuffle").onclick = () => {
      shuffleTiles();
      moves = 0;
      $("#stat-moves").textContent = "0";
      startTimer();
      gameActive = true;
      renderBoard();
    };

    // Win overlay buttons
    $("#btn-win-home").onclick = () => {
      showScreen(screenHome);
    };
    $("#btn-win-next").onclick = () => {
      // Pick next artwork
      const currentIdx = ARTWORKS.findIndex((a) => a.id === currentArtwork.id);
      const nextIdx = (currentIdx + 1) % ARTWORKS.length;
      startGame(ARTWORKS[nextIdx]);
    };
  }

  // ---------- KEYBOARD SUPPORT ----------

  function bindKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (!gameActive) return;
      const empty = emptyPos();
      let targetIdx = -1;

      switch (e.key) {
        case "ArrowUp":
          // Move tile below empty UP into the empty spot
          if (empty.row < GRID - 1)
            targetIdx = (empty.row + 1) * GRID + empty.col;
          break;
        case "ArrowDown":
          if (empty.row > 0)
            targetIdx = (empty.row - 1) * GRID + empty.col;
          break;
        case "ArrowLeft":
          if (empty.col < GRID - 1)
            targetIdx = empty.row * GRID + (empty.col + 1);
          break;
        case "ArrowRight":
          if (empty.col > 0)
            targetIdx = empty.row * GRID + (empty.col - 1);
          break;
        default:
          return;
      }

      if (targetIdx >= 0) {
        e.preventDefault();
        handleTileClick(targetIdx);
      }
    });
  }

  // ---------- TOUCH / SWIPE SUPPORT ----------

  function bindTouch() {
    let startX, startY;
    const board = $("#puzzle-board");

    board.addEventListener("touchstart", (e) => {
      if (!gameActive) return;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }, { passive: true });

    board.addEventListener("touchend", (e) => {
      if (!gameActive || startX === undefined) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 20) return; // too short

      const empty = emptyPos();
      let targetIdx = -1;

      if (absDx > absDy) {
        // Horizontal swipe
        if (dx > 0 && empty.col > 0) {
          // Swipe right: move tile left of empty
          targetIdx = empty.row * GRID + (empty.col - 1);
        } else if (dx < 0 && empty.col < GRID - 1) {
          targetIdx = empty.row * GRID + (empty.col + 1);
        }
      } else {
        // Vertical swipe
        if (dy > 0 && empty.row > 0) {
          targetIdx = (empty.row - 1) * GRID + empty.col;
        } else if (dy < 0 && empty.row < GRID - 1) {
          targetIdx = (empty.row + 1) * GRID + empty.col;
        }
      }

      if (targetIdx >= 0) handleTileClick(targetIdx);
      startX = startY = undefined;
    }, { passive: true });
  }

  // ---------- INIT ----------

  function init() {
    initHome();
    bindEvents();
    bindKeyboard();
    bindTouch();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
