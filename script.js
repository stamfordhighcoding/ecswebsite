document.addEventListener('DOMContentLoaded', () => {
  const items  = document.querySelectorAll('.nav-item');
  const buffer = 20;  // px from the right edge for detection only

  // 1) Precompute for each popup whether it would overflow
  items.forEach(item => {
    const popup = item.querySelector('.popup');

    // Temporarily show it (hidden) so we can measure
    popup.style.visibility = 'hidden';
    popup.style.display    = 'block';
    popup.style.left       = '0';
    popup.style.right      = '';

    const rect = popup.getBoundingClientRect();
    item._touchingEdge = rect.right > (window.innerWidth - buffer);

    // Re-hide
    popup.style.display    = '';
    popup.style.visibility = '';
  });

  let hideTimer = null;

  items.forEach(item => {
    const link  = item.querySelector('a, button');
    const popup = item.querySelector('.popup');

    const show = () => {
      popup.classList.add('active');
      if (item._touchingEdge) {
        // overflow case → nudge left by setting right to -40px
        popup.style.left  = 'auto';
        popup.style.right = '-20px';
      } else {
        // normal
        popup.style.left  = '';
        popup.style.right = '';
      }
    };

    const hide = () => {
      popup.classList.remove('active');
      popup.style.left  = '';
      popup.style.right = '';
    };

    link.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      items.forEach(other => {
        if (other !== item) {
          other.querySelector('.popup').classList.remove('active');
        }
      });
      show();
    });

    link.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(hide, 500);
    });

    popup.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
    });

    popup.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(hide, 500);
    });
  });

  // (Optional) recalc on resize
  window.addEventListener('resize', () => {
    items.forEach(item => {
      const popup = item.querySelector('.popup');
      popup.style.visibility = 'hidden';
      popup.style.display    = 'block';
      popup.style.left       = '0';
      popup.style.right      = '';
      const rect = popup.getBoundingClientRect();
      item._touchingEdge = rect.right > (window.innerWidth - buffer);
      popup.style.display    = '';
      popup.style.visibility = '';
    });
  });       
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////--
document.querySelectorAll('.copy-email').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
      } catch (err) {
        console.error('Copy failed', err);
      }
    });
  });


  //-------------------------------------------------------------------------------------------------------------------------------
let _outsideClickListener;

function showMobileNav() {
  const nav = document.querySelector('.nav-hidden');
  if (!nav) return;

  const isOpen = nav.style.top === '0px';

  if (!isOpen) {
    // ───── OPEN ─────
    nav.style.top = '0px';

    // Attach both click and touch listeners on next tick
    setTimeout(() => {
      _outsideClickListener = (e) => {
        // support both mouse and touch
        const y = (e.clientY !== undefined)
          ? e.clientY
          : (e.touches?.[0]?.clientY ?? 0);

        const navBottom = nav.getBoundingClientRect().bottom;
        if (y > navBottom) {
          hideNav();
        }
      };
      document.addEventListener('click', _outsideClickListener);
      document.addEventListener('touchstart', _outsideClickListener);
    }, 0);

  } else {
    // ───── CLOSE ─────
    hideNav();
  }
}

function hideNav() {
  const nav = document.querySelector('.nav-hidden');
  if (!nav) return;

  nav.style.top = '-520px';

  if (_outsideClickListener) {
    document.removeEventListener('click', _outsideClickListener);
    document.removeEventListener('touchstart', _outsideClickListener);
    _outsideClickListener = null;
  }
}
//-----------------------------------------------------------------------------------------------
function initNavHoverColor() {
  const links = document.querySelectorAll('.nav-tn-subsection a');
  links.forEach(link => {
    // add .hovered on hover/touchstart
    link.addEventListener('mouseenter', () => link.classList.add('hovered'));
    link.addEventListener('touchstart',   () => link.classList.add('hovered'));
    // remove on leave/end
    link.addEventListener('mouseleave', () => link.classList.remove('hovered'));
    link.addEventListener('touchend',   () => link.classList.remove('hovered'));
  });
}

// kick it off once the DOM is ready
document.addEventListener('DOMContentLoaded', initNavHoverColor);
//-----------------------------------------------------------------
function contact() {
  const email = 'ascianna@stamfordct.gov';  // your address
  const gmailComposeUrl =
    'https://mail.google.com/mail/?view=cm&fs=1'
    + `&to=${encodeURIComponent(email)}`;

  // 1) Copy the email
  navigator.clipboard.writeText(email)
    .catch(err => {
      console.warn('Email copy failed:', err);
    })
    .finally(() => {
      // 2) Open Gmail compose
      const win = window.open(gmailComposeUrl, '_blank');
      
      // 3) After 1ms, focus that new tab/window
      setTimeout(() => {
        if (win) win.focus();
      }, 1);
    });
}
//-------------------------------------------------------------
function creditDetails() {
  document.querySelectorAll('.credit-details').forEach(el => {
    const isHidden = window.getComputedStyle(el).display === 'none';

    if (isHidden) {
      // ─── SHOW ───
      el.style.display = 'list-item';          // re-insert into layout
      el.style.height  = '0px';                 // start collapsed
      el.style.opacity = '0';                   // start transparent

      // measure full height
      const fullH = el.scrollHeight + 'px';

      // on next frame, expand & fade-in
      requestAnimationFrame(() => {
        el.style.height  = fullH;
        el.style.opacity = '1';
      });

      // once done, clear fixed height so it can grow if needed
      el.addEventListener('transitionend', function done() {
        el.style.height = 'auto';
        el.removeEventListener('transitionend', done);
      }, { once: true });

    } else {
      // ─── HIDE ───
      // fix current height so the collapse transition will work
      el.style.height  = el.scrollHeight + 'px';
      el.style.opacity = '1';

      // next frame: collapse & fade-out
      requestAnimationFrame(() => {
        el.style.height  = '0px';
        el.style.opacity = '0';
      });

      // after transition: remove from layout
      el.addEventListener('transitionend', function done() {
        el.style.display = 'none';
        el.removeEventListener('transitionend', done);
      }, { once: true });
    }
  });
}
function courseDetails() {
   document.querySelectorAll('.course-details').forEach(el => {
    const isHidden = window.getComputedStyle(el).display === 'none';

    if (isHidden) {
      // ─── SHOW ───
      el.style.display = 'list-item';          // re-insert into layout
      el.style.height  = '0px';                 // start collapsed
      el.style.opacity = '0';                   // start transparent

      // measure full height
      const fullH = el.scrollHeight + 'px';

      // on next frame, expand & fade-in
      requestAnimationFrame(() => {
        el.style.height  = fullH;
        el.style.opacity = '1';
      });

      // once done, clear fixed height so it can grow if needed
      el.addEventListener('transitionend', function done() {
        el.style.height = 'auto';
        el.removeEventListener('transitionend', done);
      }, { once: true });

    } else {
      // ─── HIDE ───
      // fix current height so the collapse transition will work
      el.style.height  = el.scrollHeight + 'px';
      el.style.opacity = '1';

      // next frame: collapse & fade-out
      requestAnimationFrame(() => {
        el.style.height  = '0px';
        el.style.opacity = '0';
      });

      // after transition: remove from layout
      el.addEventListener('transitionend', function done() {
        el.style.display = 'none';
        el.removeEventListener('transitionend', done);
      }, { once: true });
    }
  });
}
 (function() {
    const toggleOff = document.getElementById('faculty-profile-off');
    const container = document.getElementById('faculty-container');

    function hideIfVisible() {
      if (!container) return;
      const style = window.getComputedStyle(container);
      if (style.display !== 'none') {
        container.style.display = 'none';
      }
    }

    // Attach click listener
    toggleOff.addEventListener('click', hideIfVisible);
  })();

let scrolled;

function facultyDetails(member) {
  // 1) Show the container
  const container = document.getElementById('faculty-container');
  if (container) {
    container.style.display = 'block';
  }

  // 2) Hide all profile divs
  document
    .querySelectorAll('#faculty-profile > div')
    .forEach(el => el.style.display = 'none');

  // 3) Show only the elements whose class matches the member
  document
    .querySelectorAll(`#faculty-profile .${member}`)
    .forEach(el => el.style.display = 'block');

  // export scroll position
  scrolled = window.pageYOffset || document.documentElement.scrollTop;
}
