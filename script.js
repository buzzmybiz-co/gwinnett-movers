// Navigation and Scroll handling
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        // Animate hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileNav.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load
    revealOnScroll();

    // 4. Form Submission Simulation
    const quoteForm = document.getElementById('quoteForm');
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = quoteForm.querySelector('.btn-primary');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.textContent = 'Quote Requested! ✓';
            btn.style.backgroundColor = '#10B981'; // Success green
            btn.style.color = '#fff';
            quoteForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
});

// AI Image Estimator Logic
document.addEventListener('DOMContentLoaded', () => {
    const uploadZone = document.getElementById('uploadZone');
    if (!uploadZone) return; // Only run on the estimates page

    const imageInput = document.getElementById('imageInput');
    const roomTypeSelect = document.getElementById('roomType');
    
    const step1 = document.getElementById('aiStep1');
    const step2 = document.getElementById('aiStep2');
    const step3 = document.getElementById('aiStep3');
    
    const previewImage = document.getElementById('previewImage');
    const scanningRoomLabel = document.getElementById('scanningRoomLabel');
    const resultRoomLabel = document.getElementById('resultRoomLabel');
    const aiTableBody = document.getElementById('aiTableBody');
    const totalVolumeEl = document.getElementById('totalVolume');
    const addAnotherBtn = document.getElementById('addAnotherBtn');

    // Drag and drop styles
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files[0]);
        }
    });

    imageInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
        }
    });

    function handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const roomType = roomTypeSelect.value;
        scanningRoomLabel.textContent = roomType;
        resultRoomLabel.textContent = roomType;

        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            
            // Transition to Step 2
            step1.style.display = 'none';
            step2.style.display = 'block';

            // Simulate 3 seconds of AI Processing
            setTimeout(() => {
                generateMockResults(roomType);
                step2.style.display = 'none';
                step3.style.display = 'inline-block';
            }, 3000);
        };
        reader.readAsDataURL(file);
    }

    function generateMockResults(room) {
        aiTableBody.innerHTML = '';
        let items = [];
        let total = 0;

        if (room === 'Living Room') {
            items = [
                { name: '3-Seater Sofa', qty: 1, vol: 50 },
                { name: 'Coffee Table', qty: 1, vol: 15 },
                { name: 'TV Stand / Media Console', qty: 1, vol: 25 },
                { name: '65" Television', qty: 1, vol: 10 },
                { name: 'Medium Boxes (Estimated)', qty: 6, vol: 18 }
            ];
        } else if (room === 'Bedroom') {
            items = [
                { name: 'Queen Bed Frame & Mattress', qty: 1, vol: 65 },
                { name: 'Nightstands', qty: 2, vol: 10 },
                { name: '6-Drawer Dresser', qty: 1, vol: 35 },
                { name: 'Wardrobe Boxes', qty: 3, vol: 45 }
            ];
        } else if (room === 'Kitchen') {
            items = [
                { name: 'Dining Table', qty: 1, vol: 30 },
                { name: 'Dining Chairs', qty: 4, vol: 20 },
                { name: 'Medium Boxes (Dishes/Pots)', qty: 15, vol: 45 }
            ];
        } else if (room === 'Office Workspace') {
            items = [
                { name: 'Office Desk', qty: 1, vol: 25 },
                { name: 'Ergonomic Office Chair', qty: 1, vol: 15 },
                { name: 'Bookshelf', qty: 1, vol: 20 },
                { name: 'Small Boxes (Books/Files)', qty: 10, vol: 15 }
            ];
        } else {
            items = [
                { name: 'Misc Furniture', qty: 2, vol: 40 },
                { name: 'Assorted Boxes', qty: 10, vol: 30 }
            ];
        }

        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.vol}</td>
            `;
            aiTableBody.appendChild(tr);
            total += item.vol;
        });

        totalVolumeEl.textContent = total;
    }

    addAnotherBtn.addEventListener('click', () => {
        // Reset UI
        imageInput.value = '';
        previewImage.src = '';
        step3.style.display = 'none';
        step1.style.display = 'block';
    });
});
