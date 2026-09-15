/*  =====================
  Global variables for sections
  ====================== */
const collectionSection = document.querySelector(".collection-section")
// const collectionHeading = document.querySelector(".collection-heading")
const artworkTitle = document.querySelector("#artwork-title")
const exhibitionTitle = document.querySelector("#exhibition-title")
const collectionInfo = document.querySelector("#info")

/*  =====================
  Async Await functions 
  for two GET Fetch requests
  ====================== */

// 1st GET request, endpoint 1
// sends request to api server, returns back JSON data which is parsed through
async function fetchArtwork() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=title,date_display,artist_title,medium_display,dimensions,is_public_domain",
    )
    if (!response.ok) {
      throw new Error("Request failed: " + response.status)
    }

    const data = await response.json()
    console.log("artworks:", data)
    const artworks = data.data

    //clears section first
    collectionInfo.innerHTML = ""
    artworkTitle.textContent = ""
    exhibitionTitle.textContent = ""

    //creates heading for Artwork
    artworkTitle.textContent = "About artworks"

    artworks.forEach((item) => {
      // Labels any images in the public domain
      let domainLabel = ""
      if (item.is_public_domain) {
        domainLabel = "Public Domain"
      }
      // labels null(missing) items as "unknown" in artist titles
      let artist = ""
      if (!item.artist_title) {
        artist = "Unknown Artist"
      } else {
        artist = item.artist_title
      }
    // 
      const artworkElement = document.createElement("p")
      artworkElement.textContent = `${item.title}\n${item.date_display}\n${artist}\n${item.medium_display}\n${item.dimensions}\n${domainLabel}`
      collectionInfo.appendChild(artworkElement)
    })
    // catches any errors or bad responses from server of api fetch request
  } catch (error) {
    collectionInfo.innerHTML = "ERROR: Something went wrong..."
    console.error("Something went wrong...:", error)
  }
}

// 2nd GET request, endpoint 2
async function fetchExhibitions() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/exhibitions?fields=title,aic_start_at,aic_end_at",
    )
    if (!response.ok) {
      throw new Error("Request failed" + response.status)
    }
    // returns reponse of JSON data and running an if statement to check if request was successful or not
    // if not, throws error message with "Request failed" followed by error occurred
    const data = await response.json()
    console.log("exhibitions:", data)
    const exhibitions = data.data

    //clears section first
    collectionInfo.innerHTML = ""
    artworkTitle.textContent = ""
    exhibitionTitle.textContent = ""

    //creates heading for Exhibitions
    exhibitionTitle.textContent = "Exhibitions"

    //loops iterates through repo array
    exhibitions.forEach((item) => {
      const exhibitionElement = document.createElement("p")

      // makes date data from API legible and looks out for unavailable dates
      // appends message if date is null, undefined, or missing
      let start = "No start date available"
      if (item.aic_start_at) {
        const startDate = new Date(item.aic_start_at)
        if (!isNaN(startDate.getTime())) {
          start = startDate.toLocaleDateString()
        }
      }
      let end = "No end date available"
      if (item.aic_end_at) {
        const endDate = new Date(item.aic_end_at)
        if (!isNaN(endDate.getTime())) {
          end = endDate.toLocaleDateString()
        }
      }
    // adds title and date of exhibition to exhibition section
      exhibitionElement.textContent = `${item.title}\n${start} - ${end}`
      collectionInfo.appendChild(exhibitionElement)
    })
    // catches any errors from server from api fetch request
  } catch (error) {
    collectionInfo.innerHTML = "ERROR: Something went wrong..."
    console.error("Something went wrong...:", error)
  }
}
/*  =====================
  Button calls to Fetch requests
  ====================== */

// btn displays 1st GET request, endpoint 1 (general artwork info)
document.querySelector("#btn-artwork").addEventListener("click", () => {
  fetchArtwork()
  collectionInfo.classList.toggle("show")
})

// btn displays 2nd GET request, endpoint 2 (past exhibtions info)
document.querySelector("#btn-exhibitions").addEventListener("click", () => {
  fetchExhibitions()
  collectionInfo.classList.toggle("show")
})
