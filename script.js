// script.js

// Product Data
const PRODUCT_DATA = {
    'nfc-business-card': {
        name: 'NFC Business Card',
        image: 'assets/Products/business-card.png',
        colors: {
            'matte-black': { name: 'Matte Black', hex: '#0a0a0a', primary: true },
            'electric-violet': { name: 'Electric Violet', hex: '#8b5cf6', primary: false },
            'deep-purple': { name: 'Deep Purple', hex: '#7c3aed', primary: false }
        },
        defaultColor: 'matte-black'
    },
    'keychain-tag': {
        name: 'Keychain Tag',
        image: 'assets/Products/keyfob.png',
        colors: {
            'matte-black': { name: 'Matte Black', hex: '#0a0a0a', primary: true },
            'electric-violet': { name: 'Electric Violet', hex: '#8b5cf6', primary: false },
            'silver': { name: 'Silver', hex: '#c0c0c0', primary: false }
        },
        defaultColor: 'matte-black'
    },
    'smart-wallet': {
        name: 'Smart Wallet',
        image: 'assets/Products/money-clip.png',
        colors: {
            'matte-black': { name: 'Matte Black', hex: '#0a0a0a', primary: true },
            'electric-violet': { name: 'Electric Violet', hex: '#8b5cf6', primary: false },
            'charcoal': { name: 'Charcoal', hex: '#1a1a1a', primary: false }
        },
        defaultColor: 'matte-black'
    },
    'custom-tags': {
        name: 'Custom Tags',
        image: 'assets/Products/stiker.png',
        colors: {
            'matte-black': { name: 'Matte Black', hex: '#0a0a0a', primary: true },
            'electric-violet': { name: 'Electric Violet', hex: '#8b5cf6', primary: false },
            'white': { name: 'White', hex: '#ffffff', primary: false },
            'red': { name: 'Red', hex: '#dc2626', primary: false },
            'blue': { name: 'Blue', hex: '#2563eb', primary: false }
        },
        defaultColor: 'matte-black'
    },
    'nfc-stand': {
        name: 'NFC Stand',
        image: 'assets/Products/stand.png',
        colors: {
            'matte-black': { name: 'Matte Black', hex: '#0a0a0a', primary: true },
            'white': { name: 'White', hex: '#ffffff', primary: false }
        },
        defaultColor: 'matte-black'
    },
    'smart-watch-strap': {
        name: 'Smart Watch Strap',
        image: 'assets/Products/strap.jpeg',
        colors: {
            'black': { name: 'Black', hex: '#0a0a0a', primary: true },
            'silicone-white': { name: 'Silicone White', hex: '#f3f4f6', primary: false },
            'navy-blue': { name: 'Navy Blue', hex: '#1e3a8a', primary: false }
        },
        defaultColor: 'black'
    },
    'card-holder': {
        name: 'Card Holder',
        image: 'assets/Products/card-holder2.png',
        images: [
            'assets/images/products/card-holder-1.png',
            'assets/Products/card-holder-2.png'
        ],
        colors: {
            'leather-black': { name: 'Leather Black', hex: '#1a1a1a', primary: true },
            'brown': { name: 'Brown', hex: '#8B4513', primary: false }
        },
        defaultColor: 'leather-black'
    }
};

// Product pricing and availability
const PRODUCT_PRICES = {
    'nfc-business-card': { price: '399 EGP', available: true },
    'keychain-tag': { price: '325 EGP', available: true },
    'card-holder': { price: '380 EGP', available: true },
    'smart-wallet': { price: 'Out of Stock', available: false },
    'custom-tags': { price: 'Out of Stock', available: false },
    'nfc-stand': { price: 'Out of Stock', available: false },
    'smart-watch-strap': { price: 'Out of Stock', available: false }
};

// WhatsApp Order Links
const WHATSAPP_ORDER_LINKS = {
    'nfc-business-card': {
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeUTTaApoI2HQK27DCflFZlVeNTs2Nf0hgj4aoE5275Oe3uUA/viewform?usp=header',
        label: 'Order NFC Business Card via WhatsApp'
    },
    'card-holder': {
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeH6HIDm9GCVxtrJLvo9V7wPdQHWqNdz9EWjZGUniY7l-o8FA/viewform?usp=header',
        label: 'Order NFC Card Holder via WhatsApp'
    },
    'keychain-tag': {
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSfIRXTrhf0wz2a8Awl3RV_j44ngiu8Vit2dD6vguVVMWoqjPQ/viewform?usp=header',
        label: 'Order NFC Keychain via WhatsApp'
    },
    'smart-wallet': {
        url: 'https://wa.me/201515329908?text=I%20want%20to%20order%20an%20NFC%20Wallet',
        label: 'Order NFC Wallet via WhatsApp'
    },
    'custom-tags': {
        url: 'https://wa.me/201515329908?text=I%20want%20to%20order%20an%20NFC%20Sticker',
        label: 'Order NFC Sticker via WhatsApp'
    },
    'nfc-stand': {
        url: 'https://wa.me/201515329908?text=I%20want%20to%20order%20an%20NFC%20Stand',
        label: 'Order NFC Stand via WhatsApp'
    },
    'smart-watch-strap': {
        url: 'https://wa.me/201515329908?text=I%20want%20to%20order%20an%20NFC%20Watch%20Strap',
        label: 'Order NFC Watch Strap via WhatsApp'
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing...');
    initializeMobileNavigation();
    initializeProductHovers();

    // Check if we are on the product details page
    if (window.location.pathname.includes('product-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            loadProductDetails(productId);
        }
    }
});

// Mobile Navigation
function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Navigate to individual product page
function navigateToProductPage(productId) {
    console.log(`Navigating to product page: ${productId}`);
    window.location.href = `product-details.html?id=${productId}`;
}

// Initialize hover effects for product cards
function initializeProductHovers() {
    const productCards = document.querySelectorAll('.product-detail-card, .product-card');
    console.log(`Found ${productCards.length} product cards`);

    productCards.forEach(card => {
        const buttons = card.querySelectorAll('.btn-details');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productId = card.dataset.productId;
                console.log(`Button clicked for product: ${productId}`);
                if (productId) {
                    navigateToProductPage(productId);
                } else {
                    console.error('No product ID found on card:', card);
                }
            });
        });
    });
}

// Load product details based on ID
window.loadProductDetails = function (productId) {
    const product = PRODUCT_DATA[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Update page title
    document.title = `${product.name} | FLO`;

    // Update product info
    const titleEl = document.getElementById('product-title');
    const priceEl = document.getElementById('product-price');
    const descEl = document.getElementById('product-description');
    const imgEl = document.getElementById('product-main-image');
    const colorsContainer = document.getElementById('color-options');

    if (titleEl) titleEl.textContent = product.name;

    // Set price based on availability
    if (priceEl) {
        const priceInfo = PRODUCT_PRICES[productId] || { price: 'Contact for Price', available: true };
        priceEl.textContent = priceInfo.price;

        // Style out of stock items in red
        if (!priceInfo.available) {
            priceEl.style.color = '#dc2626';
        } else {
            priceEl.style.color = 'var(--accent-color)';
        }
    }

    if (descEl) descEl.textContent = 'Experience the future of networking with our premium NFC technology. Share your contact info, social media, and more with just a tap.';

    // Update image
    if (imgEl) {
        imgEl.src = product.image || `assets/images/products/${productId}.png`;
        imgEl.onerror = function () {
            this.src = 'https://via.placeholder.com/600x400/0a0a0a/8b5cf6?text=' + encodeURIComponent(product.name);
        };
        imgEl.alt = product.name;
    }

    // Handle multiple images (Gallery)
    const galleryContainer = document.querySelector('.product-gallery');
    if (galleryContainer && product.images && product.images.length > 1) {
        let thumbContainer = galleryContainer.querySelector('.thumbnail-container');
        if (!thumbContainer) {
            thumbContainer = document.createElement('div');
            thumbContainer.className = 'thumbnail-container';
            galleryContainer.appendChild(thumbContainer);
        } else {
            thumbContainer.innerHTML = '';
        }

        product.images.forEach((imgSrc, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
            const thumbImg = document.createElement('img');
            thumbImg.src = imgSrc;
            thumbImg.alt = `${product.name} view ${index + 1}`;
            thumb.appendChild(thumbImg);

            thumb.addEventListener('click', () => {
                if (imgEl) imgEl.src = imgSrc;
                thumbContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });

            thumbContainer.appendChild(thumb);
        });
    }

    // Populate colors
    if (colorsContainer && product.colors) {
        colorsContainer.innerHTML = '';
        Object.entries(product.colors).forEach(([key, color]) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-option';
            colorDiv.style.backgroundColor = color.hex;
            colorDiv.title = color.name;
            colorDiv.dataset.color = key;
            colorDiv.setAttribute('data-color', color.name);

            if (key === product.defaultColor) {
                colorDiv.classList.add('selected');
            }

            colorDiv.addEventListener('click', function () {
                document.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            });
            colorsContainer.appendChild(colorDiv);
        });
    }

    // Handle Order Now buttons with WhatsApp integration
    const orderBtns = document.querySelectorAll('.order-now-btn, .btn-order');
    orderBtns.forEach(btn => {
        // Get WhatsApp link configuration
        const whatsappConfig = WHATSAPP_ORDER_LINKS[productId];

        if (!whatsappConfig) {
            console.warn(`No WhatsApp link configured for product: ${productId}`);
            // Fallback behavior
            btn.addEventListener('click', function () {
                alert(`Thank you for your interest in ${product.name}! Please contact us to place your order.`);
            });
            return;
        }

        // Set accessibility label
        btn.setAttribute('aria-label', whatsappConfig.label);

        // If it's an anchor tag, set href directly
        if (btn.tagName === 'A') {
            btn.href = whatsappConfig.url;
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
        } else {
            // For button elements, add click listener (check if already added to avoid duplicates)
            if (!btn.dataset.whatsappInitialized) {
                btn.dataset.whatsappInitialized = 'true';
                btn.addEventListener('click', function () {
                    window.open(whatsappConfig.url, '_blank', 'noopener,noreferrer');
                });
            }
        }
    });
};