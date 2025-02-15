document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name-input');
    const inputButton = document.getElementById('input-button');
    const scoreboardBody = document.getElementById('scoreboard-body');

    let scoreData = {}; // Menyimpan data skor (nama: skor)

    // Fungsi untuk menyimpan skor ke localStorage
    function saveScores() {
        localStorage.setItem('scores', JSON.stringify(scoreData));
    }

    // Fungsi untuk memuat skor dari localStorage
    function loadScores() {
        const savedScores = localStorage.getItem('scores');
        if (savedScores) {
            scoreData = JSON.parse(savedScores);
        }
        updateScoreboard();
    }

    // Fungsi untuk memperbarui tampilan papan skor
    function updateScoreboard() {
        // Hapus semua baris yang ada
        scoreboardBody.innerHTML = '';

        // Urutkan skor
        const sortedPlayers = Object.keys(scoreData).sort((a, b) => scoreData[b] - scoreData[a]);

        let rank = 1;
        for (const player of sortedPlayers) {
            const score = scoreData[player];

            const row = document.createElement('tr');

            const rankCell = document.createElement('td');
            rankCell.textContent = rank;
            row.appendChild(rankCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = player;
            row.appendChild(nameCell);

            const scoreCell = document.createElement('td');
            scoreCell.textContent = score;
            row.appendChild(scoreCell);

            scoreboardBody.appendChild(row);
            rank++;
        }
    }

    // Event listener untuk tombol input
    inputButton.addEventListener('click', function() {
        const playerName = nameInput.value.trim();
        if (playerName === '') {
            return; // Jangan lakukan apa pun jika nama kosong
        }

        // Tambahkan atau perbarui skor
        if (scoreData[playerName]) {
            scoreData[playerName]++;
        } else {
            scoreData[playerName] = 1;
        }

        saveScores(); // Simpan ke localStorage
        updateScoreboard(); // Perbarui tampilan
        nameInput.value = ''; // Bersihkan input
    });

    // Muat skor saat halaman dimuat
    loadScores();
});