document.addEventListener('DOMContentLoaded', function() {
    const checkmarkSVG = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100.000000pt" height="100.000000pt" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M610 545 l-235 -235 -90 90 -91 90 -29 -30 -29 -31 119 -119 120 -120 265 265 265 265 -30 30 -30 30 -235 -235z"/> </g> </svg>';
    const checkmarkSpans = document.querySelectorAll('.checkmark');
    checkmarkSpans.forEach(span => {
        span.innerHTML = checkmarkSVG;
    });

    const adExperienceContainer = document.querySelector('.ad-experience-container');
    const confirmationContainer = document.querySelector('.confirmation-container');
    const actionsRow = document.querySelector('.actions-row');
    const adContainer = document.querySelector('.ad-container');
    const adVideo = document.querySelector('.ad-container video');
    const selectedGenresSpan = document.querySelector('.selected-genres');

    const genreButtons = document.querySelectorAll('.genre-btn');
    const skipBtn = document.querySelector('.skip-btn');
    const goAdsFreeBtn = document.querySelector('.go-ads-free');
    
    const timer = document.querySelector('.confirmation-timer');
    const timerValue = document.querySelector('.timer-value');

    let timerInterval;
    let timerCount = 5;
    let status = 'ad-experience';

    function updateActionButton() {
        const selectedCount = document.querySelectorAll('.genre-btn.selected').length;
        if (selectedCount === 0) {
            skipBtn.textContent = 'Skip';
            skipBtn.disabled = false;
            skipBtn.classList.remove('inactive');
        } else if (selectedCount > 0 && selectedCount < 3) {
            skipBtn.textContent = 'Continue';
            skipBtn.disabled = true;
            skipBtn.classList.add('inactive');
        } else if (selectedCount >= 3) {
            skipBtn.textContent = 'Continue';
            skipBtn.disabled = false;
            skipBtn.classList.remove('inactive');
        }
    }

    function showConfirmationView() {
        status = 'confirmation';

        adExperienceContainer.style.display = 'none';

        confirmationContainer.style.display = 'flex';

        actionsRow.style.justifyContent = 'space-between';

        goAdsFreeBtn.style.display = 'none';

        skipBtn.textContent = 'Continue Watching';
        skipBtn.blur();

        const selectedGenres = document.querySelectorAll('.genre-btn.selected');

        if(selectedGenres && selectedGenres.length > 0) {
            const genreTexts = Array.from(selectedGenres).map(btn => btn.textContent.trim());
            selectedGenresSpan.textContent = genreTexts.join(', ');
        }

        timer.style.display = 'block';
        
        timerCount = 5;
        timerValue.textContent = timerCount;

        timerInterval = setInterval(() => {
            timerCount--;
            timerValue.textContent = timerCount;
            if (timerCount <= 0) {
                clearInterval(timerInterval);
                showAd();
            }
        }, 1000);
    }

    genreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.classList.toggle('selected');
            updateActionButton();
        });
    });

    skipBtn.addEventListener('click', function() {
        const selectedCount = document.querySelectorAll('.genre-btn.selected').length;
        if(status === 'ad-experience' && selectedCount > 0) {
            setTimeout(() => {
                showConfirmationView();
            }, 1000);
        } else {
            setTimeout(() => {
                showAd();
            }, 1000);
        }
    });

    const showAd = () => {
        adContainer.style.display = 'flex';
        adVideo.style.display = 'block';
        adVideo.play();
        actionsRow.style.display = 'none';
        adExperienceContainer.style.display = 'none';
        confirmationContainer.style.display = 'none';
    }

    updateActionButton();
});
