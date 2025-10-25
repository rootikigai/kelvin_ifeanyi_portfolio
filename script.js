//I want to be able to turn pages when I click the next or prev (chevron) buttons
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500)
        } 
        else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500)
        }
    };
});
// ✅ Always start from first page on refresh
window.addEventListener("load", () => {
  const turnedPages = document.querySelectorAll(".book-page.turn, .page-left.turn");
  turnedPages.forEach(page => page.classList.remove("turn"));

  const allPages = document.querySelectorAll(".book-page");
  allPages.forEach((page, index) => {
    page.style.zIndex = 20 - index;
  });

  window.scrollTo(0, 0); // optional: reset scroll position
});
