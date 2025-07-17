document.addEventListener('DOMContentLoaded', () => {

    // --- Elements ---
    const allProjectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const moreInfoBtns = document.querySelectorAll('.more-info-btn');
    const modalNavPrev = document.getElementById('modal-nav-prev');
    const modalNavNext = document.getElementById('modal-nav-next');

    // Modal content fields
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalContributionsList = document.getElementById('modal-contributions');
    const modalLinksContainer = document.getElementById('modal-links');
    const modalTeam = document.getElementById('modal-team');
    const modalDuration = document.getElementById('modal-duration');

    // Slider Elements
    const sliderImage = document.getElementById('modal-screenshot');
    const sliderPrevBtn = document.querySelector('.modal-slider .slider-btn.prev');
    const sliderNextBtn = document.querySelector('.modal-slider .slider-btn.next');

    // --- State ---
    let currentProjectIndex = 0;
    let currentProjectScreenshots = [];
    let currentScreenshotIndex = 0;

    // --- Functions ---
    function populateModal(projectCard) {
        const title = projectCard.dataset.title;
        const description = projectCard.dataset.description;
        const team = projectCard.dataset.team;
        const duration = projectCard.dataset.duration;
        const contributions = JSON.parse(projectCard.dataset.contributions);
        const screenshots = JSON.parse(projectCard.dataset.screenshots);
        const itchUrl = projectCard.dataset.itchUrl;
        const youtubeUrl = projectCard.dataset.youtubeUrl;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalTeam.textContent = team ? `Team: ${team}` : '';
        modalDuration.textContent = duration ? `Duration: ${duration}` : '';

        modalContributionsList.innerHTML = '';
        contributions.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalContributionsList.appendChild(li);
        });

        modalLinksContainer.innerHTML = '';
        if (itchUrl) {
            modalLinksContainer.innerHTML += `<a href="${itchUrl}" target="_blank" class="modal-link-btn itch"><img src="Logo/itch.jpg" alt="itch.io logo" class="link-icon"></a>`;
        }
        if (youtubeUrl) {
            modalLinksContainer.innerHTML += `<a href="${youtubeUrl}" target="_blank" class="modal-link-btn youtube"><img src="Logo/yt.jpg" alt="YouTube logo" class="link-icon"></a>`;
        }

        currentProjectScreenshots = screenshots;
        currentScreenshotIndex = 0;
        updateScreenshotSlider();
    }

    function updateScreenshotSlider() {
        if (!currentProjectScreenshots || currentProjectScreenshots.length === 0) {
            sliderImage.src = 'https://placehold.co/600x400/333/FFF?text=No+Screenshots';
            sliderPrevBtn.classList.add('hidden');
            sliderNextBtn.classList.add('hidden');
            return;
        }

        sliderImage.src = currentProjectScreenshots[currentScreenshotIndex];
        sliderPrevBtn.classList.toggle('hidden', currentScreenshotIndex === 0);
        sliderNextBtn.classList.toggle('hidden', currentScreenshotIndex === currentProjectScreenshots.length - 1);
    }

    function updateModalNav() {
        modalNavPrev.classList.toggle('hidden', currentProjectIndex === 0);
        modalNavNext.classList.toggle('hidden', currentProjectIndex === allProjectCards.length - 1);
    }

    function openModal(index) {
        currentProjectIndex = index;
        populateModal(allProjectCards[currentProjectIndex]);
        updateModalNav();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // --- Event Listeners ---
    moreInfoBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            openModal(index);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Modal navigation listeners
    modalNavNext.addEventListener('click', () => {
        if (currentProjectIndex < allProjectCards.length - 1) {
            currentProjectIndex++;
            populateModal(allProjectCards[currentProjectIndex]);
            updateModalNav();
        }
    });

    modalNavPrev.addEventListener('click', () => {
        if (currentProjectIndex > 0) {
            currentProjectIndex--;
            populateModal(allProjectCards[currentProjectIndex]);
            updateModalNav();
        }
    });

    // Screenshot slider listeners
    sliderNextBtn.addEventListener('click', () => {
        if (currentScreenshotIndex < currentProjectScreenshots.length - 1) {
            currentScreenshotIndex++;
            updateScreenshotSlider();
        }
    });

    sliderPrevBtn.addEventListener('click', () => {
        if (currentScreenshotIndex > 0) {
            currentScreenshotIndex--;
            updateScreenshotSlider();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('hidden')) return;

        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'ArrowRight') {
            modalNavNext.click(); 
        }
        if (e.key === 'ArrowLeft') {
            modalNavPrev.click();
        }
    });

    // Email copy listener
    const emailLink = document.getElementById('email-link');
    const copyNotification = document.getElementById('copy-notification');
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.dataset.email;
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            copyNotification.classList.add('show');
            setTimeout(() => {
                copyNotification.classList.remove('show');
            }, 2000);
        } catch (err) {
            console.error('Was not able to copy the email: ', err);
        }
        document.body.removeChild(textarea);
    });
});
