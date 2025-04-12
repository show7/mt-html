// Function to load HTML components
async function loadComponent(url) {
  try {
    // Remove leading slash to use relative paths
    const relativePath = url.startsWith('/') ? url.substring(1) : url;
    const response = await fetch(relativePath);
    if (!response.ok) {
      throw new Error(`Error loading component: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Failed to load component:', error);
    return '';
  }
}

// Function to insert header and footer
async function insertComponents() {
  const body = document.body;

  // Insert header at the beginning of the body
  const headerHTML = await loadComponent('/components/header.html');
  if (headerHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;

    // Find the first element in the body (to insert before it)
    const firstElement = body.firstChild;
    // Insert header at the beginning of the body
    if (tempDiv.firstElementChild) {
      body.insertBefore(tempDiv.firstElementChild, firstElement);
    }
  }

  // Insert footer at the end of the body
  const footerHTML = await loadComponent('/components/footer.html');
  if (footerHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = footerHTML;

    // Always append the footer to the end of the body
    if (tempDiv.firstElementChild) {
      body.appendChild(tempDiv.firstElementChild);
    }

    // Log success message to confirm footer was inserted
    console.log('Footer component inserted successfully');
  } else {
    console.error('Failed to load footer component');
  }

  // Initialize mobile menu toggle functionality
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Run the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', insertComponents);
