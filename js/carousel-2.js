//Initialize Element Variables
const carousel = document.querySelector('#carousel-2');
const track2 = carousel.querySelector('.carousel__track');
const slides2 = Array.from(track2.children);
const nextButton2 = carousel.querySelector('.carousel__button--right');
const prevButton2 = carousel.querySelector('.carousel__button--left');
const dotsNavs2 = carousel.querySelector('.carousel__nav');
const dots2 = Array.from(dotsNavs2.children);
const slideWidth2 = slides2[0].getBoundingClientRect().width;

//for each slide in the array, arrange them next to one another
slides2.forEach((slide, index) => {
    slide.style.left = slideWidth2 * index + 'px';
})

/** -------------- FUNCTION DECLARATIONS -------------------- */
//Function declaration for moving the slide
const moveToSlide2 = (track, currentSlide, targetSlide) => {
    //move the slide with a certain amount (in this case the left point of the target slide)
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    //update current slide
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

//Function declaration for updating the dots
const updateDots2 = (currentDot, targetDot) => {
    //Update current dot
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

//Function declaration for hiding or showing arrows
const hideShowArrows2 = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {                        //If you are at the first index,
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === (slides.length - 1)) { //If you are at the last index,
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {                                        //Otherwise,
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
        console.log("Prev Button should appear")
    }
}

/** -------------- CLICK EVENT LISTENERS -------------------- */

// when I click left, move slides to left
prevButton2.addEventListener('click', e => {
    //find current and target slide
    const currentSlide = track2.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNavs2.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides2.findIndex(slide => slide === prevSlide);
    //move the slide and update current nav indicator
    moveToSlide2(track2, currentSlide, prevSlide);
    //Based on current index of nav indicator, add or remove the hidden class property for the arrows
    hideShowArrows2(slides2, prevButton2, nextButton2, prevIndex);
    console.log(slides2.length);
})

// when I click right, move slides to right
nextButton2.addEventListener('click', e => {
    //find current and target slide
    const currentSlide = track2.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNavs2.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides2.findIndex(slide => slide === nextSlide);
    //move the slide and update current nav indicator
    moveToSlide2(track2, currentSlide, nextSlide);
    //Based on current index of nav indicator, add or remove the hidden class property for the arrows
    hideShowArrows2(slides2, prevButton2, nextButton2, nextIndex);
    console.log(slides2.length);console.log("test2");
})

// when I click the nav indicators, move to that slide
dotsNavs2.addEventListener('click', e => {
    // determine which nav indicator button was clicked on
    const targetDot = e.target.closest('button');
    // If not a button, simply return and exit function
    if (!targetDot) return;
    // Otherwise, if it is a button, continue
    const currentSlide = track2.querySelector('.current-slide');
    const currentDot = dotsNavs2.querySelector('.current-slide');
    //Find the slide that the nav indicator is pointing to when the user selects an index
    const targetIndex = dots2.findIndex(dot => dot === targetDot);
    const targetSlide = slides2[targetIndex];
    //Move to the target slide
    moveToSlide2(track2, currentSlide, targetSlide);
    //Update current nav indicator
    updateDots2(currentDot, targetDot);
    //Based on current index of nav indicator, add or remove the hidden class property for the arrows
    hideShowArrows2(slides2, prevButton2, nextButton2, targetIndex);
    console.log("test3");
})