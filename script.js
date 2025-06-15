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

    // --- Itch.io and YouTube SVG Icons ---
    const itchIcon = `<svg viewBox="0 0 256 256"><path d="M255.91,63.951c-0.031-0.119-0.06-0.237-0.092-0.355c-0.11-0.407-0.254-0.808-0.435-1.201 c-0.057-0.129-0.119-0.256-0.184-0.381c-0.183-0.355-0.395-0.7-0.631-1.034c-0.082-0.117-0.165-0.232-0.253-0.345 c-0.245-0.315-0.512-0.618-0.803-0.907c-0.113-0.113-0.228-0.223-0.347-0.33c-0.291-0.264-0.598-0.515-0.925-0.748 c-0.14-0.1-0.282-0.196-0.428-0.289c-0.329-0.213-0.67-0.41-1.025-0.589c-0.174-0.088-0.349-0.172-0.528-0.252 c-0.36-0.163-0.729-0.31-1.107-0.44c-0.203-0.069-0.408-0.133-0.616-0.191c-0.383-0.109-0.772-0.203-1.168-0.281 c-0.223-0.045-0.447-0.083-0.673-0.118c-0.76-0.119-1.532-0.178-2.31-0.178h-55.821c-3.133,0-5.672,2.539-5.672,5.672v7.941 h-61.47V56.684c0-3.133-2.539-5.672-5.672-5.672H55.438c-0.779,0-1.55,0.059-2.31,0.178c-0.226,0.035-0.45,0.073-0.673,0.118 c-0.397,0.078-0.785,0.172-1.168,0.281c-0.208,0.058-0.413,0.122-0.616,0.191c-0.378,0.13-0.747,0.277-1.107,0.44 c-0.179,0.08-0.354,0.164-0.528,0.252c-0.355,0.179-0.696,0.375-1.025,0.589c-0.146,0.093-0.288,0.189-0.428,0.289 c-0.327,0.233-0.634,0.484-0.925,0.748c-0.118,0.107-0.234,0.217-0.347,0.33c-0.291,0.289-0.558,0.592-0.803,0.907 c-0.088,0.113-0.171,0.228-0.253,0.345c-0.236,0.334-0.448,0.679-0.631,1.034c-0.065,0.125-0.127,0.252-0.184,0.381 c-0.18,0.393-0.325,0.794-0.435,1.201c-0.031,0.118-0.061,0.236-0.092,0.355C0.031,64.07,0,64.188,0,64.307v127.385 c0,3.133,2.539,5.672,5.672,5.672h244.656c3.133,0,5.672-2.539,5.672-5.672V64.307C256,64.188,255.969,64.07,255.91,63.951z M100.805,103.041c-8.52,0-15.426,6.906-15.426,15.426s6.906,15.426,15.426,15.426s15.426-6.906,15.426-15.426 S109.325,103.041,100.805,103.041z M155.195,133.892c8.52,0,15.426-6.906,15.426-15.426s-6.906-15.426-15.426-15.426 s-15.426,6.906-15.426,15.426S146.675,133.892,155.195,133.892z"/></svg>`;
    const youtubeIcon = `<svg viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>`;

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

        // Populate links
        modalLinksContainer.innerHTML = '';
        if (itchUrl) {
            modalLinksContainer.innerHTML += `<a href="${itchUrl}" target="_blank" class="modal-link-btn itch">${itchIcon}itch.io</a>`;
        }
        if (youtubeUrl) {
            modalLinksContainer.innerHTML += `<a href="${youtubeUrl}" target="_blank" class="modal-link-btn youtube">${youtubeIcon}YouTube</a>`;
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

    // Close modal if user clicks on the overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Slider navigation
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
