//꽝에 걸리지 않고 7개의 이빨을 모두 뽑았을 때 꽝을 클릭해도 액션이 없도록 하거나

//악어이빨 배열 (8개)
const $teeth = document.querySelectorAll('section.game>p.game>img');
const $game = document.querySelector('section.game');
console.log($teeth);
//gameover 화면
const $endGame = document.querySelector('section.endgame');

const $p = document.querySelector('section.game>p.game');
//로또 숫자볼을 노출할 span (배열 6개)
const $divLotto = document.querySelector('section.game>div.lotto');
const $lottos = document.querySelectorAll('section.game>div.lotto>span');

//header 움직이는 악어 이미지
const $logo = document.querySelector('header>h1+p');
setInterval(function () {
	$logo.classList.toggle('openmouth');
}, 300);

//게임 시작 시 로또번호 6개를 출력해 배열에 담는다(게임이 끝날때까지 변하지 않는 값)
const balls = new Array();
for (let k = 1; k <= 45; k++) balls.push(k);

let lotto = [];

for (let i = 0; i < 7; i++) {
	const index = Math.floor(Math.random() * balls.length);
	lotto.push(balls[index]);
	balls.splice(index, 1);
}
console.log('로또번호는=>', lotto);

//꽝에 걸릴 이빨의 인덱스
let bomb = Math.floor(Math.random() * $teeth.length);
console.log('꽝 =', bomb);

//꽝을 제외한 이빨들 배열
let $cavityTeeth = [];

for (let i = 0; i < 8; i++) {
	if (i === bomb) continue;
	$cavityTeeth.push($teeth[i]);
}
console.log($cavityTeeth);

//꽝이벤트 section의 모든 내용이 사라지고 bgi_end 이미지만 노출
$teeth[bomb].addEventListener('click', function (evt) {
	$p.classList.add('vibration');

	//악어이빨을 누르면 숫자를 하나씩 노출 하고 이빨을 없앤다.
	setTimeout(function () {
		$p.classList.remove('vibration');
		evt.target.style.display = 'none';

		alert('으악!!!! 악어에게 물렸어요!!!');
		$game.style.display = 'none';
		$endGame.style.display = 'block';
	}, 1500);
});

//꽝을 제외한 이빨들 이벤트
$cavityTeeth.forEach(function ($tooth, idx) {
	$tooth.addEventListener('click', function (evt) {
		$p.classList.add('vibration');

		setTimeout(function () {
			$p.classList.remove('vibration');
			evt.target.style.display = 'none';

			alert('이빨 뽑기 성공!');
			$lottos[idx].textContent = lotto[idx];
			if (lotto[idx] <= 10) {
				$lottos[idx].style.borderColor = '#f81f1f';
			}
			if (lotto[idx] > 10 && lotto[idx] <= 20) {
				$lottos[idx].style.borderColor = '#f87517';
			}
			if (lotto[idx] > 20 && lotto[idx] <= 30) {
				$lottos[idx].style.borderColor = '#2df10f';
			}
			if (lotto[idx] > 30 && lotto[idx] <= 45) {
				$lottos[idx].style.borderColor = '#0c61d9';
			}
			$lottos[idx].classList.add('appear');
		}, 1500);
	});
});

const $congrats = document.querySelector('section.game>div.lotto+p');
let clickCount = 0;
for(let i =0;i<$cavityTeeth.length;i++){
	$cavityTeeth[i].addEventListener('click',function(){
		clickCount += 1
		console.log(clickCount);

	if(clickCount===7){
		$divLotto.classList.add('sevenball');
		$congrats.textContent = '지금 당장 복권방으로 달려욧!!!!!';
	};
})
}


