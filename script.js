 // JavaScript 코드 작성
 document.addEventListener('DOMContentLoaded', function () {
    // 단어 추출
    var introductionText = document.querySelector('.introduction').textContent;
    var words = introductionText.match(/\b\w+\b/g);

    // 단어 빈도 계산
    var wordCounts = {};
    words.forEach(function(word) {
        word = word.toUpperCase();
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    // 빈도에 따라 정렬된 단어 배열 생성
    var sortedWords = Object.keys(wordCounts).sort(function(a, b) {
        return wordCounts[b] - wordCounts[a];
    });

    // 워드 클라우드 생성
    WordCloud(document.getElementById('wordCloudCanvas'), {
        list: sortedWords.map(function(word) {
            return [word, wordCounts[word]];
        }),
        backgroundColor: '#ffffff',
        weightFactor: 10,  // 단어 크기를 조절하는 요소
    });
});


/*댓글 쓰기*/
// 댓글을 세션 스토리지에 저장하는 함수
function saveComment(comment) {
    // 세션 스토리지에 저장된 댓글 목록을 가져옴
    let comments = JSON.parse(sessionStorage.getItem('comments')) || [];

    // 새로운 댓글을 추가
    comments.push(comment);

    // 세션 스토리지에 업데이트된 댓글 목록을 저장
    sessionStorage.setItem('comments', JSON.stringify(comments));
}

// 댓글을 화면에 표시하는 함수
function displayComments() {
    // 세션 스토리지에서 댓글 목록을 가져옴
    let comments = JSON.parse(sessionStorage.getItem('comments')) || [];

    // 댓글을 표시할 컨테이너 선택
    let commentsContainer = document.getElementById('comments-container');

    // 기존에 표시된 댓글 삭제
    commentsContainer.innerHTML = '';

    // 댓글을 화면에 표시
    comments.forEach(comment => {
        let commentElement = document.createElement('div');
        commentElement.className = 'd-flex mb-4';
        commentElement.innerHTML = `
            <div class="flex-shrink-0"><img class="rounded-circle" src="./assets/black.png" alt="..."></div>
            <div class="ms-3">
                <div class="fw-bold">Anonymous</div>
                ${comment}
            </div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// 댓글 추가 버튼 클릭 시 실행되는 함수
function addComment() {
    // 입력된 댓글 내용을 가져옴
    let commentInput = document.getElementById('comment-input');
    let commentText = commentInput.value.trim();

    // 댓글이 비어있지 않은 경우에만 처리
    if (commentText !== '') {
        // 세션 스토리지에 댓글 저장
        saveComment(commentText);

        // 댓글 목록을 다시 표시
        displayComments();

        // 입력 필드 초기화
        commentInput.value = '';
    }
}

// 페이지 로드 시 초기 댓글 표시
window.onload = function () {
    displayComments();
};
