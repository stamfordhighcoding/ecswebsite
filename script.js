if (window.innerWidth >= 1000) {
    window.addEventListener("scroll", function () {
        let scrolled = window.scrollY > 160;
        let elements = ["#homepagevid", "#video-overflow"];

        elements.forEach(selector => {
            let el = document.querySelector(selector);
            if (el) {
                el.style.transition = "max-height 0.5s ease";
                el.style.maxHeight = scrolled ? "300px" : "650px";
            }
        });
    });
} else {
    console.log("width less than 1000.");
}
//------------------------------------------------------------------
function unmuteHeroVideo() {
    const video = document.getElementById('homepagevid');
    const button = document.getElementById('unmuteHeroVideo');
    video.muted = !video.muted;
    if (video.muted) {
        button.textContent = "Unmute";
    } else {
        button.textContent = "Mute";    
    }
    if (!video.muted) {
        video.play(); 
    }
}
//----------------------------------------------------------------------
let expandedHerosoHiddenNav = false;

function expandHeroVideo() {
    document.getElementById('homepagevid').style.maxHeight = '1000px';
    document.getElementById('video-overflow').style.maxHeight = '1000px';
    const salesCard = document.getElementById('salescard');
    salesCard.style.display = 'none';  
    expandedHerosoHiddenNav = true; 

    if (expandedHerosoHiddenNav === true) {  
        document.querySelector('nav').style.marginTop = '-90px'; 
    }
}
//
window.addEventListener('scroll', function() {
    if (expandedHerosoHiddenNav && window.scrollY > 0) {
        expandedHerosoHiddenNav = false;
        document.querySelector('nav').style.marginTop = '0px'; 
        const salesCard = document.getElementById('salescard');
        salesCard.style.display = 'block';  
    }
});
//---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const buttons = {
      'webDev': document.getElementById('webDev'),
      'databaseDev': document.getElementById('databaseDev'),
      'Prgmg': document.getElementById('Prgmg'),
      'pubSpeaking': document.getElementById('pubSpeaking'),
      'bio': document.getElementById('bio'),
      'design': document.getElementById('design')
    };
  
    const containers = {
      'webDev': document.getElementById('webDev-container'),
      'databaseDev': document.getElementById('databaseDev-container'),
      'Prgmg': document.getElementById('Prgmg-container'),
      'pubSpeaking': document.getElementById('pubSpeaking-container'),
      'bio': document.getElementById('bio-container'),
      'design': document.getElementById('design-container')
    };

    function hideAllContainers() {
      Object.values(containers).forEach(container => {
        container.style.display = 'none';
      });
    }

    function resetButtonOpacity() {
      Object.values(buttons).forEach(button => {
        button.style.opacity = '0.6';  // Set all buttons to opacity 0.6
      });
    }

    hideAllContainers();
    containers['webDev'].style.display = 'block';

    Object.keys(buttons).forEach(key => {
      buttons[key].addEventListener('click', function() {
        hideAllContainers();
        containers[key].style.display = 'block';
        
        resetButtonOpacity();  // Reset opacity of all buttons
        buttons[key].style.opacity = '1';  // Set clicked button's opacity to 1
      });
    });
});

//------------------------------------------------
//Only free if it aids in completing associates degree; not free for completely unrelated classes. You are still provided some leeway with an amount of electives. You are still enrolled in CTState though, and can pay for any college class
document.addEventListener('DOMContentLoaded', function() {
    const courseTerms = document.getElementById('courseTerms');
  
    courseTerms.addEventListener('click', function(event) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip'; 
      tooltip.textContent = 'Only free if it aids in completing associate\'s degree; not free for completely unrelated classes. You are still provided some leeway with an amount of electives. You are still enrolled in CTState though, and can pay for any college class';
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = '#333';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.maxWidth = '300px';
      tooltip.style.fontSize = '14px';
      tooltip.style.zIndex = '1000';
      tooltip.style.pointerEvents = 'none';
      document.body.appendChild(tooltip);
      function updateTooltipPosition(e) {
        tooltip.style.left = e.pageX + 10 + 'px'; 
        tooltip.style.top = e.pageY + 10 + 'px';
      }
      document.addEventListener('mousemove', updateTooltipPosition);
      setTimeout(function() {
        tooltip.remove();
        document.removeEventListener('mousemove', updateTooltipPosition); 
      }, 9000);
    });
  });
//------------------------------------------------------------
let isExpanded = false;

function expandCourseinfoTable() {
    const rows = document.querySelectorAll("#courseinfo table tr:nth-child(n+4)");
    const buttonText = document.querySelector("#toggleCourseinfoButton h2");

    isExpanded = !isExpanded;

    rows.forEach(row => {
        row.style.display = isExpanded ? "table-row" : "none";
    });

    if (buttonText) {
        buttonText.innerText = isExpanded ? "See Less" : "See More";
        // Toggle the 'expanded' class to change the carrot direction
        buttonText.classList.toggle('expanded', isExpanded);
    }
}
//-----------------------------------------------
if (document.querySelector('.faculty-card')) {
  let themeClasses = ["default", "green", "orange", "shape", "paper"];
  let themeColors = {
    "default": "white",
    "green": "#154430",
    "orange": "#fcc264",
    "shape": "darkgray",
    "paper": "#f5f5f5"
  };
  let themeNumber = 0; // start at index 0

  function applyTheme() {
    const cards = document.querySelectorAll('.faculty-card');
    const currentTheme = themeClasses[themeNumber];
    const currentColor = themeColors[currentTheme];
    
    // Update the CSS variable for card color
    document.documentElement.style.setProperty('--card-color', currentColor);
    
    cards.forEach(card => {
      // Remove any previously applied theme classes
      themeClasses.forEach(theme => {
        card.classList.remove(`cardTheme-${theme}`);
      });
      
      // Add the new theme class
      card.classList.add(`cardTheme-${currentTheme}`);
      
      // Apply the background color directly to ensure all cards have it
      card.style.backgroundColor = currentColor;
    });
  }

  function themeBack() {
    console.log("went back");
    // Loop back to the end if necessary
    themeNumber = (themeNumber - 1 + themeClasses.length) % themeClasses.length;
    applyTheme();
  }

  function themeNext() {
    console.log("went next");
    // Loop to the beginning if necessary
    themeNumber = (themeNumber + 1) % themeClasses.length;
    applyTheme();
  }

  applyTheme();

  //--------------------------loop extra
  function logParagraphHeights() {
    const cards = document.querySelectorAll('.faculty-card');
    cards.forEach(card => {
      const paragraph = card.querySelector('p');
      if (paragraph) {
        const height = paragraph.offsetHeight;
        // Check if the paragraph's height is more than 210px
        if (height > 210) {
          card.classList.add('overflow-card');
        } else {
          card.classList.remove('overflow-card');
        }
      } else {
        console.log('No <p> element found in this card.');
      }
    });
  }

  logParagraphHeights();
  window.addEventListener('resize', logParagraphHeights);
}
//-------------------event listener for after
document.addEventListener('click', function(event) {
  document.querySelectorAll('.faculty-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    // Check if the click is inside the card
    if (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    ) {
      // Check if the click is in the bottom 60 pixels of the card
      if (event.clientY >= (rect.bottom - 60)) {
        console.log('Clicked on the bottom 60 pixels of a .faculty-card element.');
        
        // Toggle expanded state
        if (card.classList.contains('expanded')) {
          // Collapse card
          card.classList.remove('expanded');
          card.style.height = '360px';
          card.style.zIndex = 'auto'; // Reset z-index when collapsed
          card.style.position = 'static'; // Reset position
          card.classList.add('overflow-card');
          
          // Update "Read Full" text to show again
          const readFullPseudoElement = card.querySelector('.read-full-element');
          if (readFullPseudoElement) {
            readFullPseudoElement.textContent = 'Read Full';
          }
        } else {
          // Expand card
          card.classList.add('expanded');
          
          // Set position to relative and z-index to 3 for this specific card
          card.style.position = 'relative';
          card.style.zIndex = '3';
          
          // Calculate required height based on content
          const paragraph = card.querySelector('p');
          if (paragraph) {
            const requiredHeight = Math.max(360, paragraph.offsetHeight + 180); // Add padding
            card.style.height = requiredHeight + 'px';
            card.classList.remove('overflow-card');
            
            // Update "Read Full" text to "Collapse"
            const readFullPseudoElement = card.querySelector('.read-full-element');
            if (readFullPseudoElement) {
              readFullPseudoElement.textContent = 'Collapse';
            } else {
              console.log("can collapse");
            }
          }
        }
      }
    }
  });
});