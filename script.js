// logic to flip my pages
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            // Turn page backwards
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        } else {
            // Turn page forwards
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    };
});


// So, on refresh, I always start from the first page
window.addEventListener("load", () => {
  const book = document.querySelector(".book");

  // that nonsense page flicker, this tries to prevent it. Not perfect yet
  book.style.visibility = "hidden";
  book.style.opacity = "0";
  book.style.transition = "opacity 0.6s ease";

  // Reset all pages to their initial state after DOM manipulates
  setTimeout(() => {
    const turnedPages = document.querySelectorAll(".book-page.turn, .page-left.turn");
    turnedPages.forEach(page => page.classList.remove("turn"));

    const allPages = document.querySelectorAll(".book-page");
    allPages.forEach((page, index) => {
      page.style.zIndex = 20 - index;
    });

    // I prevent scroll glitch
    window.scrollTo(0, 0);

    // then reveal book smoothly
    book.style.visibility = "visible";
    book.style.opacity = "1";
  }, 150);
});


// logic for contact me button
const contactBtn = document.querySelector(".contact-me");

contactBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const rightPages = document.querySelectorAll(".book-page.page-right");

  // Flip all pages forward automatically to get to contact page
  rightPages.forEach((page, i) => {
    setTimeout(() => {
      page.classList.add("turn");
      page.style.zIndex = 20 + i;
    }, i * 500);
  });
});


// logic for back to profile button
const backToProfileBtn = document.querySelector(".back-profile");

backToProfileBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Get all pages (both left and right) in correct DOM order
  const allPages = Array.from(document.querySelectorAll(".book-page"));
  const rightPages = Array.from(document.querySelectorAll(".book-page.page-right")).reverse();

  // Temporarily disable clicks during animation
  backToProfileBtn.style.pointerEvents = "none";

  // Flip all pages backward to get to profile page
  rightPages.forEach((page, i) => {
    setTimeout(() => {
      page.classList.remove("turn");
      page.style.zIndex = 20 - i;
    }, i * 500);
  });

  // After all flips, normalize z-index for all pages in DOM order
  setTimeout(() => {
    allPages.forEach((page, index) => {
      page.style.zIndex = 20 - index;
    });

    // Re-enable button after animation completes
    backToProfileBtn.style.pointerEvents = "auto";
  }, rightPages.length * 500 + 600);
});


// Scaling logic to fit layout for width/height on small screens
function applyFitToWidth() {
  const wrapper = document.querySelector('.wrapper');
  if (!wrapper) return;

  // Reset any inline scaling/transform so natural measurements are used
  wrapper.style.transform = '';

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  // When in portrait on small screens I rotate layout 90deg in CSS.
  // Effective layout size (after rotation) should use swapped viewport dimensions.
  const isPortraitMobile = window.matchMedia('(max-width: 900px) and (orientation: portrait)').matches;

  const layoutWidth = isPortraitMobile ? viewportH : viewportW;
  const layoutHeight = isPortraitMobile ? viewportW : viewportH;

  // The CSS default wrapper size for desktop is 66rem x 45rem (rem depends on root font-size)
  // We'll read computed size to determine intrinsic layout size.
  const computed = window.getComputedStyle(wrapper);
  // Parse computed width/height in px
  const intrinsicW = parseFloat(computed.width);
  const intrinsicH = parseFloat(computed.height);

  // Compute scale to fit width and height without overflow
  const scaleX = layoutWidth / intrinsicW;
  const scaleY = layoutHeight / intrinsicH;
  const scale = Math.min(scaleX, scaleY, 1); // never upscale beyond 1

  // Apply transform: if rotated via CSS for portrait, include rotate(90deg)
  if (isPortraitMobile) {
    wrapper.style.transform = `translate(-50%, -50%) rotate(90deg) scale(${scale})`;
    wrapper.style.top = '50%';
    wrapper.style.left = '50%';
    wrapper.style.position = 'absolute';
    wrapper.style.transformOrigin = 'center center';
  } else {
    // Reset transform for non-rotated view, but apply scale centered
    wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    wrapper.style.top = '50%';
    wrapper.style.left = '50%';
    wrapper.style.position = 'absolute';
    wrapper.style.transformOrigin = 'center center';
  }

  // Prevent body scroll that could reveal cutoffs
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

// Run on load and resize with debounce
let fitTimeout;
function runFitDebounced() {
  clearTimeout(fitTimeout);
  fitTimeout = setTimeout(applyFitToWidth, 120);
}

window.addEventListener('load', () => {
  // ensure previous load handler logic runs first (keeps page reset behavior)
  setTimeout(() => {
    applyFitToWidth();
  }, 220);
});

window.addEventListener('resize', runFitDebounced);
window.matchMedia('(max-width: 900px) and (orientation: portrait)').addEventListener('change', runFitDebounced);


