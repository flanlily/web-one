<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>リアルタイムフォント変換と検索</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .output {
            margin-top: 20px;
            font-family: FangSong, serif;
            font-size: 24px;
        }
        .textbox {
            width: 100%;
            padding: 10px;
            font-size: 18px;
        }
        .results {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <h1>リアルタイムでFangSongフォントに変換</h1>
    
    <!-- テキスト入力ボックス -->
    <input type="text" class="textbox" id="inputText" placeholder="ここに文字を入力してください">
    
    <!-- フォントが適用されるリアルタイム結果表示エリア -->
    <div class="output" id="outputText"></div>
    
    <!-- WikipediaやXの検索結果を表示するエリア -->
    <div class="results" id="searchResults"></div>

    <script>
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const searchResults = document.getElementById('searchResults');

        // 入力時にリアルタイムで表示を更新し、APIを呼び出す
        inputText.addEventListener('input', function() {
            const input = inputText.value;
            outputText.textContent = input; // FangSongの文字を表示

            // Wikipedia検索
            if (input.startsWith('#w ')) {
                const query = input.substring(3);
                searchWikipedia(query);
            }
            
            // X（旧Twitter）検索
            if (input.startsWith('#x ')) {
                const query = input.substring(3);
                searchX(query); // Xの検索処理（APIキーが必要）
            }
        });

        // Wikipedia APIを使用して記事を検索
        function searchWikipedia(query) {
            const apiUrl = `https://ja.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.query.search.length > 0) {
                        const articleTitle = data.query.search[0].title;
                        const articleSnippet = data.query.search[0].snippet;
                        searchResults.innerHTML = `
                            <h3>Wikipedia結果</h3>
                            <p><strong>${articleTitle}</strong></p>
                            <p>${articleSnippet}...</p>
                            <a href="https://ja.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}" target="_blank">続きを読む</a>
                        `;
                    } else {
                        searchResults.innerHTML = '<p>検索結果が見つかりませんでした。</p>';
                    }
                })
                .catch(error => {
                    console.error('Wikipedia検索中にエラーが発生しました:', error);
                    searchResults.innerHTML = '<p>Wikipedia検索中にエラーが発生しました。</p>';
                });
        }

        // Xの検索処理（ここにAPIキーが必要）
        function searchX(query) {
            // X APIのリクエストを送るコードをここに書きます。
            // XのAPIキーが必要です。
            searchResults.innerHTML = `<p>X検索の機能は準備中です。</p>`;
        }
    </script>
</body>
</html>
