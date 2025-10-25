// ============ PAGE TURNING FUNCTIONALITY ============
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            // Turn page back
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        } else {
            // Turn page forward
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    };
});


// ============ ALWAYS START FROM FIRST PAGE ON REFRESH ============
window.addEventListener("load", () => {
  const book = document.querySelector(".book");

  // Hide book immediately to prevent flicker
  book.style.visibility = "hidden";
  book.style.opacity = "0";
  book.style.transition = "opacity 0.6s ease";

  // Reset all pages to their initial state after DOM paints
  setTimeout(() => {
    const turnedPages = document.querySelectorAll(".book-page.turn, .page-left.turn");
    turnedPages.forEach(page => page.classList.remove("turn"));

    const allPages = document.querySelectorAll(".book-page");
    allPages.forEach((page, index) => {
      page.style.zIndex = 20 - index;
    });

    // Prevent scroll glitch
    window.scrollTo(0, 0);

    // Reveal book smoothly
    book.style.visibility = "visible";
    book.style.opacity = "1";
  }, 150);
});


// ============ CONTACT ME BUTTON ============
const contactBtn = document.querySelector(".contact-me");

contactBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const rightPages = document.querySelectorAll(".book-page.page-right");

  // Flip all right-hand pages forward
  rightPages.forEach((page, i) => {
    setTimeout(() => {
      page.classList.add("turn");
      page.style.zIndex = 20 + i;
    }, i * 500);
  });
});


// ============ BACK TO PROFILE BUTTON ============
const backToProfileBtn = document.querySelector(".back-profile");

backToProfileBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Get all pages (both left and right) in correct DOM order
  const allPages = Array.from(document.querySelectorAll(".book-page"));
  const rightPages = Array.from(document.querySelectorAll(".book-page.page-right")).reverse();

  // Step 1: Temporarily disable clicks during animation
  backToProfileBtn.style.pointerEvents = "none";

  // Step 2: Flip all right pages backward with proper timing
  rightPages.forEach((page, i) => {
    setTimeout(() => {
      page.classList.remove("turn");
      page.style.zIndex = 20 - i;
    }, i * 500);
  });

  // Step 3: After all flips, normalize z-index for all pages in DOM order
  setTimeout(() => {
    allPages.forEach((page, index) => {
      page.style.zIndex = 20 - index;
    });

    // Re-enable button after animation completes
    backToProfileBtn.style.pointerEvents = "auto";
  }, rightPages.length * 500 + 600);
});

