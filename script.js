document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Elements ---
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const moreInfoBtns = document.querySelectorAll('.more-info-btn');

    // Modal content fields
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalContributionsList = document.getElementById('modal-contributions');
    const modalLinksContainer = document.getElementById('modal-links');

    // --- Slider Elements ---
    const sliderImage = document.getElementById('modal-screenshot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    let currentProjectScreenshots = [];
    let currentScreenshotIndex = 0;

    // --- Functions ---
    function populateModal(projectCard) {
        // Get data from data-* attributes
        const title = projectCard.dataset.title;
        const description = projectCard.dataset.description;
        const contributions = JSON.parse(projectCard.dataset.contributions);
        const screenshots = JSON.parse(projectCard.dataset.screenshots);
        const itchUrl = projectCard.dataset.itchUrl;
        const youtubeUrl = projectCard.dataset.youtubeUrl;

        // Populate basic info
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        // Populate contributions
        modalContributionsList.innerHTML = '';
        contributions.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalContributionsList.appendChild(li);
        });

        // Populate links using image tags instead of SVG
        modalLinksContainer.innerHTML = '';
        if (itchUrl) {
            // This now uses an <img> tag. Make sure 'images/itch-logo.jpg' exists!
            modalLinksContainer.innerHTML += `<a href="${itchUrl}" target="_blank" class="modal-link-btn itch"><img src="images/itch-logo.jpg" alt="itch.io logo" class="link-icon">itch.io</a>`;
        }
        if (youtubeUrl) {
            // This now uses an <img> tag. Make sure 'images/youtube-logo.jpg' exists!
            modalLinksContainer.innerHTML += `<a href="${youtubeUrl}" target="_blank" class="modal-link-btn youtube"><img src="images/youtube-logo.jpg" alt="YouTube logo" class="link-icon">YouTube</a>`;
        }
        
        // Reset and setup slider
        currentProjectScreenshots = screenshots;
        currentScreenshotIndex = 0;
        updateSlider();
    }

    function updateSlider() {
        if (currentProjectScreenshots.length === 0) {
            sliderImage.src = 'https://placehold.co/600x400/333/FFF?text=No+Screenshots';
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
            return;
        }

        sliderImage.src = currentProjectScreenshots[currentScreenshotIndex];
        
        // Show/hide prev/next buttons
        prevBtn.classList.toggle('hidden', currentScreenshotIndex === 0);
        nextBtn.classList.toggle('hidden', currentScreenshotIndex === currentProjectScreenshots.length - 1);
    }

    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // --- Event Listeners ---
    moreInfoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectCard = btn.closest('.project-card');
            populateModal(projectCard);
            openModal();
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentScreenshotIndex < currentProjectScreenshots.length - 1) {
            currentScreenshotIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentScreenshotIndex > 0) {
            currentScreenshotIndex--;
            updateSlider();
        }
    });
});
