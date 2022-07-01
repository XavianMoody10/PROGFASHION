"use strict";
// User page navigation interation when clicking and scrolling
const PageNavigationLinks = () => {
  const pageLinks = document.querySelectorAll("#page-links li a");
  const sections = document.querySelectorAll("section");

  function removeCurrentClass() {
    pageLinks.forEach((links) => {
      links.classList.remove("current");
    });
  }

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      removeCurrentClass();
      e.target.classList.add("current");
    });
  });

  // Page scrolling tracker
  const ScrollNavigation = () => {
    const page = new IntersectionObserver(
      (entries) => {
        [...entries].forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = [...sections].indexOf(entry.target);
            removeCurrentClass();
            pageLinks[sectionIndex].classList.add("current");
          }
        });
      },

      // The page has to 50% visible in the viewport and then 100% visible in the viewport before an affect to happen.
      { threshold: [0.5, 1] }
    );

    sections.forEach((link) => {
      page.observe(link);
    });
  };

  ScrollNavigation();
};

// Modal Advertisment
const ModalAdvertisment = () => {
  // Show ad
  const ShowStoreAdModal = () => {
    const storeIcon = document.querySelector("#store-icon");
    const modal = document.querySelector("#modal");

    storeIcon.addEventListener("click", () => {
      modal.classList.replace("hidden", "modal");
    });
  };

  // Hide ad
  const HideStoreAdModal = () => {
    document.addEventListener("click", (e) => {
      if (e.target.id == "exit-icon" || e.target.id == "modal") {
        modal.classList.replace("modal", "hidden");
      }
    });
  };

  // Hover affect on shop containers
  const ShopContainersBtnHover = () => {
    const shopContainers = document.querySelectorAll(
      "#shop-containers .container"
    );

    shopContainers.forEach((container) => {
      container.addEventListener("mouseover", () => {
        const btn = container.querySelector("button");

        btn.style.borderColor = "white";
        btn.style.color = "white";
      });

      container.addEventListener("mouseout", () => {
        const btn = container.querySelector("button");

        btn.style.borderColor = "rgba(255, 255, 255, 0.404)";
        btn.style.color = "white";
      });
    });
  };

  ShowStoreAdModal();
  HideStoreAdModal();
  ShopContainersBtnHover();
};

const LoginLinksAnimation = () => {
  const loginIcon = document.querySelector("#login-icon");
  const loginLinks = document.querySelector("#login-links");
  const links = document.querySelectorAll("#login-links li a");
  let status = false;

  loginIcon.addEventListener("click", () => {
    if (status) {
      loginLinks.classList.remove("login-open");
      loginLinks.classList.add("login-close");

      links.forEach((link) => {
        link.style.pointerEvents = "none";
      });

      status = false;
    } else if (!status) {
      loginLinks.classList.remove("login-close");
      loginLinks.classList.add("login-open");

      links.forEach((link) => {
        link.style.pointerEvents = "auto";
      });
      status = true;
    }
  });
};

// While the Join section is within viewport, animation are triggered
const mainContentScrollAnimations = () => {
  // Get all join section content on the left side
  const gridImagesOdd = document.querySelectorAll(
    "#grid-container img:nth-child(odd)"
  );

  const gridContentOdd = document.querySelectorAll(
    "#grid-container .content:nth-child(odd)"
  );

  // Get all join section content on the right side
  const gridImagesEven = document.querySelectorAll(
    "#grid-container img:nth-child(even)"
  );

  const gridContentEven = document.querySelectorAll(
    "#grid-container .content:nth-child(even)"
  );

  // Join the elements on the left into an array
  const oddArray = [...gridImagesOdd, ...gridContentOdd];
  // Join the elements on the right into an array
  const evenArray = [...gridImagesEven, ...gridContentEven];

  // Elements on the left side triggers animations
  const itemsOnLeft = new IntersectionObserver(
    (entries) => {
      [...entries].forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("fade-out-left");
          entry.target.classList.add("fade-in-left");
        }

        if (!entry.isIntersecting) {
          entry.target.classList.remove("fade-in-left");
          entry.target.classList.add("fade-out-left");
        }
      });
    },
    { threshold: 0.3 }
  );

  evenArray.forEach((el) => {
    itemsOnLeft.observe(el);
  });

  // Elements on the right side triggers animations
  const itemsOnRight = new IntersectionObserver(
    (entries) => {
      [...entries].forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("fade-out-right");
          entry.target.classList.add("fade-in-right");
        }

        if (!entry.isIntersecting) {
          entry.target.classList.remove("fade-in-right");
          entry.target.classList.add("fade-out-right");
        }
      });
    },
    { threshold: 0.2 }
  );

  oddArray.forEach((el) => {
    itemsOnRight.observe(el);
  });
};

PageNavigationLinks();
ModalAdvertisment();
LoginLinksAnimation();
mainContentScrollAnimations();
